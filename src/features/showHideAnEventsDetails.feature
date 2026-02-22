Feature: Show/Hide Event Details
  As a user
  I want to expand and collapse an event
  So that I can view or hide its details as needed

  Scenario: An event element is collapsed by default
    Given the user has opened the events page
    When the events are displayed
    Then each event element should be collapsed by default
    And the event details should not be visible

  Scenario: User can expand an event to see details
    Given the user has opened the events page
    And an event element is collapsed
    When the user clicks on the "Show Details" button of an event
    Then the event details should be visible

  Scenario: User can collapse an event to hide details
    Given the user has opened the events page
    And the events are displayed
    And an event element is expanded
    When the user clicks on the "Hide Details" button of an event
    Then the event details should not be visible