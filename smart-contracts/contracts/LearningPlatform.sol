// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title LearningPlatform
 * @dev A smart contract for managing courses, completions, and NFT rewards on a learning platform
 *
 * This contract allows admins to create courses, users to complete them, and automatically
 * distributes NFT rewards to users who have completed courses after a specified deadline.
 */
contract LearningPlatform is ERC1155, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _courseIds;

    // Define roles for access control
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    /**
     * @dev Structure to store course details
     * @param ipfsHash IPFS hash containing course metadata
     * @param deadline Timestamp after which NFTs can be distributed
     * @param exists Boolean to check if the course exists
     */
    struct Course {
        string ipfsHash;
        uint256 deadline;
        bool exists;
    }

    // Mappings to store course data and completion status
    mapping(uint256 => Course) public courses;
    mapping(uint256 => mapping(address => bool)) public courseCompletion;

    // Events for important contract actions
    event CourseCreated(uint256 indexed courseId, string ipfsHash, uint256 deadline);
    event CourseCompleted(uint256 indexed courseId, address indexed user);
    event NFTAirdropped(uint256 indexed courseId, address[] recipients);

    /**
     * @dev Constructor to initialize the contract
     * @param uri Base URI for token metadata
     */
    constructor(string memory uri) ERC1155(uri) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Creates a new course
     * @param _ipfsHash IPFS hash containing course metadata
     * @param _deadline Timestamp after which NFTs can be distributed
     * @return newCourseId The ID of the newly created course
     */
    function createCourse(string memory _ipfsHash, uint256 _deadline) external onlyRole(ADMIN_ROLE) returns (uint256) {
        _courseIds.increment();
        uint256 newCourseId = _courseIds.current();

        courses[newCourseId] = Course(_ipfsHash, _deadline, true);
        
        emit CourseCreated(newCourseId, _ipfsHash, _deadline);
        return newCourseId;
    }

    /**
     * @dev Marks a course as completed for the calling user
     * @param _courseId The ID of the course to mark as completed
     */
    function completeCourse(uint256 _courseId) external {
        require(courses[_courseId].exists, "Course does not exist");
        require(!courseCompletion[_courseId][msg.sender], "Course already completed");

        courseCompletion[_courseId][msg.sender] = true;
        emit CourseCompleted(_courseId, msg.sender);
    }

    /**
     * @dev Airdrops NFTs to users who have completed the course after the deadline
     * @param _courseId The ID of the course for which to airdrop NFTs
     */
    function airdropNFTs(uint256 _courseId) external onlyRole(ADMIN_ROLE) {
        require(courses[_courseId].exists, "Course does not exist");
        require(block.timestamp >= courses[_courseId].deadline, "Deadline not reached");

        address[] memory recipients = getCompletedUsers(_courseId);
        require(recipients.length > 0, "No users completed the course");

        for (uint i = 0; i < recipients.length; i++) {
            _mint(recipients[i], _courseId, 1, "");
        }

        emit NFTAirdropped(_courseId, recipients);
    }

    /**
     * @dev Gets all users who have completed a specific course
     * @param _courseId The ID of the course to check
     * @return An array of addresses of users who completed the course
     */
    function getCompletedUsers(uint256 _courseId) public view returns (address[] memory) {
        uint256 count = 0;
        for (uint i = 0; i < _courseIds.current(); i++) {
            if (courseCompletion[_courseId][address(uint160(i))]) {
                count++;
            }
        }

        address[] memory completedUsers = new address[](count);
        uint256 index = 0;
        for (uint i = 0; i < _courseIds.current(); i++) {
            if (courseCompletion[_courseId][address(uint160(i))]) {
                completedUsers[index] = address(uint160(i));
                index++;
            }
        }

        return completedUsers;
    }

    /**
     * @dev Adds a new admin
     * @param newAdmin Address of the new admin
     */
    function addAdmin(address newAdmin) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ADMIN_ROLE, newAdmin);
    }

    /**
     * @dev Removes an admin
     * @param admin Address of the admin to remove
     */
    function removeAdmin(address admin) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(ADMIN_ROLE, admin);
    }

    /**
     * @dev Returns the URI for a given token ID
     * @param _tokenId The ID of the token to query
     * @return string The URI for the given token ID
     */
    function uri(uint256 _tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(_tokenId), courses[_tokenId].ipfsHash));
    }
}