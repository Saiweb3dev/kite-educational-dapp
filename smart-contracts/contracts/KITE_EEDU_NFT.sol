// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title KITE_EEDU_NFT
 * @dev A contract for managing educational courses and rewarding students with NFTs
 * This contract allows course creation, quiz attempts, and NFT minting as rewards
 */
contract KITE_EEDU_NFT is ERC1155Supply, Ownable {
    using Strings for uint256;

    // Counter for generating unique course IDs
    uint256 private _nextCourseId;

    // Mapping to store admin privileges
    mapping(address => bool) private _isAdmin;

    // Structure to store course details
    struct CourseDetails {
        string ipfsHash;    // IPFS hash for course metadata
        uint256 totalTokens; // Remaining tokens available for this course
        bool isActive;      // Flag to indicate if the course is active
    }

    // Mapping of course ID to CourseDetails
    mapping(uint256 => CourseDetails) public courses;

    // Mapping of user address to course ID to token balance
    mapping(address => mapping(uint256 => uint256)) public userBalances;

    // Maximum number of tokens a user can earn per course
    uint256 public constant MAX_TOKENS_PER_USER = 5;

    // Events
    event CourseCreated(uint256 indexed courseId, string ipfsHash);
    event QuizAttempted(address indexed user, uint256 indexed courseId, uint256 score, uint256 tokensEarned);
    event CourseUpdated(uint256 indexed courseId, string ipfsHash, bool isActive);
    event AdminStatusChanged(address indexed account, bool isAdmin);

    /**
     * @dev Constructor to initialize the contract
     * @param initialOwner Address of the initial owner of the contract
     */
    constructor(address initialOwner) 
        ERC1155("https://gateway.pinata.cloud/ipfs/") 
        Ownable(initialOwner)
    {
        _nextCourseId = 1;
    }

    /**
     * @dev Modifier to restrict access to owner or admins
     */
    modifier onlyOwnerOrAdmin() {
        require(owner() == _msgSender() || _isAdmin[_msgSender()], "Caller is not owner nor admin");
        _;
    }

    /**
     * @dev Function to set or remove admin status
     * @param account Address of the account to modify
     * @param status New admin status (true to grant, false to revoke)
     */
    function setAdmin(address account, bool status) external onlyOwner {
        _isAdmin[account] = status;
        emit AdminStatusChanged(account, status);
    }

    /**
     * @dev Function to create a new course
     * @param ipfsHash IPFS hash of the course metadata
     * @param initialSupply Initial number of tokens available for the course
     * @return courseId The ID of the newly created course
     */
    function createCourse(string memory ipfsHash, uint256 initialSupply) external onlyOwnerOrAdmin returns (uint256) {
        uint256 courseId = _nextCourseId++;
        courses[courseId] = CourseDetails(ipfsHash, initialSupply, true);
        emit CourseCreated(courseId, ipfsHash);
        return courseId;
    }

    /**
     * @dev Function to update an existing course
     * @param courseId ID of the course to update
     * @param ipfsHash New IPFS hash for the course metadata
     * @param isActive New active status for the course
     */
    function updateCourse(uint256 courseId, string memory ipfsHash, bool isActive) external onlyOwnerOrAdmin {
        require(courseId < _nextCourseId, "Course does not exist");
        CourseDetails storage course = courses[courseId];
        course.ipfsHash = ipfsHash;
        course.isActive = isActive;
        emit CourseUpdated(courseId, ipfsHash, isActive);
    }

    /**
     * @dev Function for users to attempt a quiz and earn tokens
     * @param courseId ID of the course for which the quiz is attempted
     * @param score Score achieved by the user in the quiz
     */
    function attemptQuiz(uint256 courseId, uint256 score) external {
        CourseDetails storage course = courses[courseId];
        require(course.isActive, "Course is not active");
        require(course.totalTokens > 0, "Token supply is finished");
        require(userBalances[_msgSender()][courseId] < MAX_TOKENS_PER_USER, "Max tokens minted for this course");

        uint256 earnedTokens = calculateScore(score);
        require(earnedTokens > 0, "No tokens earned");
        earnedTokens = (earnedTokens <= course.totalTokens) ? earnedTokens : course.totalTokens;

        _mint(_msgSender(), courseId, earnedTokens, "");
        course.totalTokens -= earnedTokens;
        userBalances[_msgSender()][courseId] += earnedTokens;
        emit QuizAttempted(_msgSender(), courseId, score, earnedTokens);
    }

    /**
     * @dev Internal function to calculate tokens earned based on quiz score
     * @param score The score achieved in the quiz
     * @return The number of tokens earned
     */
    function calculateScore(uint256 score) internal pure returns (uint256) {
        return (score * 20) / 50;
    }

    /**
     * @dev Override function to provide the URI for token metadata
     * @param tokenId The ID of the token
     * @return A string containing the URI for the token's metadata
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(tokenId), courses[tokenId].ipfsHash));
    }

    /**
     * @dev Function to check if a course exists
     * @param courseId The ID of the course to check
     * @return bool indicating whether the course exists
     */
    function courseExists(uint256 courseId) public view returns (bool) {
        return courseId < _nextCourseId;
    }
}