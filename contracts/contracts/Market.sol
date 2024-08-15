// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./wormhole/IWormholeRelayer.sol";
import "./wormhole/IWormholeReceiver.sol";

contract Market is IWormholeReceiver {
    struct Listing {
        uint256 price;
        address seller;
    }

    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemBought(
        address indexed buyer,
        uint16 buyerChain,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    uint256 constant GAS_LIMIT = 50_000;

    IWormholeRelayer private immutable _wormholeRelayer;
    mapping(address => mapping(uint256 => Listing)) private _listings;
    mapping(address => uint256) private _balances;

    constructor(address wormholeRelayer) {
        _wormholeRelayer = IWormholeRelayer(wormholeRelayer);
    }

    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        require(spender == owner, "Not owner");
        _;
    }

    modifier notListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = _listings[nftAddress][tokenId];
        require(listing.price == 0, "Already listed");
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = _listings[nftAddress][tokenId];
        require(listing.price > 0, "Not listed");
        _;
    }

    function getWormholeCost(
        uint16 targetChain
    ) public view returns (uint256 cost) {
        (cost, ) = _wormholeRelayer.quoteEVMDeliveryPrice(
            targetChain,
            0,
            GAS_LIMIT
        );
    }

    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    )
        public
        notListed(nftAddress, tokenId)
        isOwner(nftAddress, tokenId, msg.sender)
    {
        // Check price
        require(price > 0, "Price must be above zero");
        // Check approve
        IERC721 nft = IERC721(nftAddress);
        require(
            nft.getApproved(tokenId) == address(this),
            "Not approved for market"
        );
        // Create listing
        _listings[nftAddress][tokenId] = Listing(price, msg.sender);
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    function buyItem(
        address nftAddress,
        uint256 tokenId
    ) public payable isListed(nftAddress, tokenId) {
        // Check message value
        Listing memory listedItem = _listings[nftAddress][tokenId];
        require(msg.value == listedItem.price);
        _balances[listedItem.seller] += msg.value;
        // Complete buying
        _completeBuying(nftAddress, tokenId, msg.sender, 0x0);
    }

    function buyItem(
        uint16 targetChain,
        address targetAddress,
        address nftAddress,
        uint256 tokenId
    ) public payable isListed(nftAddress, tokenId) {
        // Check message value
        uint256 cost = getWormholeCost(targetChain);
        Listing memory listedItem = _listings[nftAddress][tokenId];
        require(msg.value == cost + listedItem.price);
        _balances[listedItem.seller] += msg.value;
        // Send request to wormhole relayer
        _wormholeRelayer.sendPayloadToEvm{value: cost}(
            targetChain,
            targetAddress,
            abi.encode(nftAddress, tokenId, msg.sender), // payload
            0, // no receiver value needed since we're just passing a message
            GAS_LIMIT
        );
    }

    function receiveWormholeMessages(
        bytes memory payload,
        bytes[] memory,
        bytes32,
        uint16 sourceChain,
        bytes32
    ) public payable override {
        // Check sender
        require(
            msg.sender == address(_wormholeRelayer),
            "Only relayer allowed"
        );
        // Parse the payload
        (address nftAddress, uint256 tokenId, address sender) = abi.decode(
            payload,
            (address, uint256, address)
        );
        // Complete buying
        _completeBuying(nftAddress, tokenId, sender, sourceChain);
    }

    function withdrawBalance() external {
        uint256 balance = _balances[msg.sender];
        require(balance > 0, "Balance is zero");
        _balances[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Transfer failed");
    }

    function getListing(
        address nftAddress,
        uint256 tokenId
    ) external view returns (Listing memory) {
        return _listings[nftAddress][tokenId];
    }

    function getBalance(address seller) external view returns (uint256) {
        return _balances[seller];
    }

    function _completeBuying(
        address nftAddress,
        uint256 tokenId,
        address buyer,
        uint16 buyerChain
    ) internal {
        Listing memory listedItem = _listings[nftAddress][tokenId];
        IERC721(nftAddress).safeTransferFrom(listedItem.seller, buyer, tokenId);
        emit ItemBought(
            msg.sender,
            buyerChain,
            nftAddress,
            tokenId,
            listedItem.price
        );
    }
}
