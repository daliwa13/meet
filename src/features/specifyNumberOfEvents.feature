Feature: Specify Number of Events
  As a user
  I want to specify how many events are displayed
  So that I can control how many upcoming events I see

  Scenario: When user hasn’t specified a number, 32 events are shown by default
    Given the user has opened the events page
    When the events are displayed
    And the user has not specified a number of events
    Then 32 events should be displayed

  Scenario: User can change the number of events displayed
    Given the user has opened the events page
    And the events are displayed
    When the user changes the number of events to 10
    Then 10 events should be displayed