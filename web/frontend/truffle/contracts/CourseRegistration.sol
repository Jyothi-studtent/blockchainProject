// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CourseRegistration {
    struct Registration {
        address studentAddress;
        string name;
        string usn;
        string branch;
        uint256 semester;
        string courseName;
        uint256 registrationDate;
    }

    event CourseRegistered(
        address indexed studentAddress,
        string name,
        string usn,
        string branch,
        uint256 semester,
        string courseName,
        uint256 registrationDate
    );

    Registration[] public registrations;
    uint256 public registrationsCount;

    function register(
        string memory _name,
        string memory _usn,
        string memory _branch,
        uint256 _semester,
        string memory _courseName
    ) public {
        // Create a new registration
        Registration memory newRegistration = Registration(
            msg.sender,
            _name,
            _usn,
            _branch,
            _semester,
            _courseName,
            block.timestamp
        );

        // Store the new registration
        registrations.push(newRegistration);
        registrationsCount++;

        // Emit the CourseRegistered event
        emit CourseRegistered(
            msg.sender,
            _name,
            _usn,
            _branch,
            _semester,
            _courseName,
            block.timestamp
        );
    }

    function getRegistration(uint256 index) public view returns (
        address studentAddress,
        string memory name,
        string memory usn,
        string memory branch,
        uint256 semester,
        string memory courseName,
        uint256 registrationDate
    ) {
        require(index < registrations.length, "Invalid index");
        Registration memory registration = registrations[index];
        return (
            registration.studentAddress,
            registration.name,
            registration.usn,
            registration.branch,
            registration.semester,
            registration.courseName,
            registration.registrationDate
        );
    }
}
