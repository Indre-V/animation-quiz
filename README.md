# The Ultimate Animation Quiz

[Link to Animation Quiz Website](https://indre-v.github.io/animation-quiz/)

The Ultimate Animation quiz offers an opportunity to test knowledge at three levels in animation including cartoons. 

Every question has a 20 second timer. Quiz users have 10 questions to challenge themselves.

Players have the option provide feedback to website creators.

![Animation-Quiz](docs/animation-quiz-responsive-display.png)

[Contents](#contents)
  * [User Goals](#user-goals)
  * [User Stories](#user-stories)
  * [Website Goals and Objectives](#website-goals-and-objectives)
  * [Wireframes](#wireframes)
  * [Design Choices](#design-choices)
    + [Typography](#typography)
    + [Colour Scheme](#colour-scheme)
    + [Images](#images)
    + [Responsiveness](#responsiveness)
- [Features](#features)
  * [Existing Features](#existing-features)
    + [Header](#header)
      - [Instructions](#instructions)
      - [Feedback](#feedback)
    + [Landing View](#landing-view)
    + [Question View](#question-view)
    + [Final Score View](#final-score-view)
    + [Footer](#footer)
  * [Future Enhancements](#future-enhancements)
- [Technologies Used](#technologies-used)
  * [Languages](#languages)
  * [Libraries & Framework](#libraries---framework)
  * [Tools](#tools)
- [Testing](#testing)
  * [Bugs Fixed](#bugs-fixed)
  * [Responsiveness Tests](#responsiveness-tests)
  * [Code Validation](#code-validation)
    + [HTML](#html)
    + [CSS](#css)
    + [JavaScript](#javascript)
  * [User Story Testing](#user-story-testing)
  * [Feature Testing](#feature-testing)
  * [Accessibility Testing](#accessibility-testing)
  * [Lighthouse Testing](#lighthouse-testing)
  * [Browser Testing](#browser-testing)
- [Deployment](#deployment)
  * [To deploy the project](#to-deploy-the-project)
  * [To fork the project](#to-fork-the-project)
  * [To clone the project](#to-clone-the-project)
- [Credits](#credits)



## User Goals

* User friendly navigation.
* Non distracting background.
* Opportunity to provide feedback.
* Clear instructions written in plain English.
* Relevant questions in the quiz.
* Fair scoring system.

## User Stories 

* As a user, I want my knowledge to be challenged.
* As a user, I want to be able to test my knowledge at different levels.
* As a user, I want to receive immediate feedback on my quiz answers.
* As a user, I want the instructions to be clear, concise and easily accessible. 
* As a user, I want navigation to be intuitive.
* As a user, I want the score system to be transparent.
* As a user, I want to be able to use website on range of devices.
* As a user, I want to be able to easily contact content creators for feedback or changes.
* As a user, I want the content to be accessible for anyone with diverse needs.

## Website Goals and Objectives

* Provide entertainment and enjoyment for users whilst testing their knowledge.
* Offer useful and accurate content that entices user to spend time on website.
* Invite users to provide feedback.
* Integrate accessibility features with high accessibility rating and diverse user audience. 
* Increase overall website traffic by increasing rankings on search engine.



[Back to top](#contents)

## Wireframes

Wireframes were designed using Balsamiq tool. Following best practices, mobile version was designed first, then tablet and lastly the laptop view. There are some deviations from wireframes in the live version of the quiz. It is one page website to enhance the logical flow. I have added level user selected in the question view, a number of correct and wrong answers as well. A functionality of local storage to display top 5 results is included in the final version as well. 

 [Mobile Wireframes](docs/mobile-wireframes.pdf "Mobile Wireframes")

 [Tablet Wireframes](docs/tablet-wireframes.pdf "Tablet Wireframes")

 [Desktop Wireframes](docs/desktop-wireframes.pdf "Desktop Wireframes")

 [Back to top](#contents)

 ## Design Choices

### Typography

The font family chosen for The Ultimate Animation quiz was [Lato]("https://fonts.google.com/specimen/Lato?query=lato"). It is a sans-serif font with a rounded appearance and a modern feel. Lato also has a clean and easy-to-read style, making it suitable for both print and web design.

### Colour Scheme

The color scheme chosen based on the background image. All the colours are cool toned to match the black and white image theme. 
![Coolors Scheme](docs/color-scheme.png)
![Contrast Grid](docs/contrast-grid-color.png)
| Primary Colors CSS HEX             |                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------ |
|     --blue: #95B0B7;               | Button and timer background color, footer hover color.                         |
|     --dark-gray: #232323;          | Font color for the quiz.                                                       |
|     --light-gray: #d8d8d8;         | Timer border color, support open background color.                             |
|     --light-cream: #f4f0ed;        | Button hover color, timer shadow color.                                        |
|     --dark-blue: #507682;          | Font color for support section, border color for buttons, active button color. |
| Other Colors CSS Hex               |                                                                                |
|     --wrong-answer-red: #ff3333;   | Color for wrong answer button.                                                 |
|     --right-answer-green: #51BF83; | Color for correct answer button, color for check icon.                         |
|     --pale-gray: #ffffff9c;        | Overlay color for the quiz container.                                          |

### Images

Background image is generated by [Gencraft]("https://gencraft.com/"). It displays cartoon characters with cool grey colors in order not to distract from the content of the quiz questions. 

### Responsiveness

My website will be responsive to different layouts depending on the size of the viewport have been included in the CSS media queries. This allows visitors to experience the website as I intended on device types and screen sizes. The breakpoints I am using are from Bootstrap.

![Breakpoints](docs/media-queries.png)

[Back to top](#contents)

# Features

Layout is easy to use and adheres to best practices in formatting and styling. The site's flow and appearance will be recognizable to users. The quiz design is visually appealing with intuitive interface, making it easy for the user to navigate through questions and options.

## Existing Features

### Header

This webpage has a header consistent across all screen sizes. It contains Instructions and Feedback sections on the right. They both can be open at the same time. The close buttons and send buttons are the same styles as all the other buttons on the page. The headings are blue color so they blend in well and do not distract the quiz players. 

![Header large screen](docs/header-full-screen.png)


#### Instructions

When clicked on instructions, a window opens with a close button on the bottom. This functionality is the same across all devices. Instructions are written in plain English and displayed in a list style view. 

<details><summary><b>Instructions View</b></summary>

![Instructions](docs/instructions.png)

</details><br/>

#### Feedback

Users have an option to submit feedback and any other queries they may have. All fields are required and verified by the code. It asks the user for name, email address and a message. 

<details><summary><b>Feedback Form</b></summary>

![Feedback](docs/feedback.png)

</details><br/>

#### Feedback Confirmation

Provides the user with acknowledgement. Page reloads after 5 seconds and returns to the start screen. 

<details><summary><b>Feedback Confirmation Page</b></summary>

![Feedback Confirmation](docs/feedback-confirm.png)

</details><br/>

[Back to top](#contents)

### Landing View

The quiz is built on one page to get the best performance. The first page consists of quiz name, welcome message, username field, difficulty levels and start button. All the buttons have hover effect and level buttons have active color as well. Username and Difficulty Levels are required fields in order to proceed to the next part of the quiz. Once they are selected, questions from API are fetched based on the difficulty level. For consistency purposes, home screen is the same across all devices. 

<details><summary><b>Landing View Large Screen</b></summary>

![Landing View Large Screen](docs/landing-view-ml-screen.png)

</details><br/>

_Small Screen Devices_ 

<details><summary><b>Landing View Small Screen</b></summary>

![Landing View Small Screen](docs/landing-view-small-screen.png)

</details><br/>

[Back to top](#contents)

### Question View

Questions are multiple choice and displayed one by one. The question body and 4 possible answers can be seen. Above the questions, users can see the timer and the progress which displays question number. The timer is set to 20 seconds, if the question is not answered to moves to the next one and the timer starts again. When the answer is selected, correct answer is displayed in green and wrong one in red. 

Users can also monitor their progress. Above the question, a question number is displayed. Also, after each question a dot appears with the corresponding color whether the answer was wrong or right. If the answer timed out, the dot will be grey. It is a vsual representation of the players progress.

Under the question choices, users can also see the level selected and the number of right and wrong answers as well. 

<details><summary><b>Question View</b></summary>

![Question Window](docs/question-window.png)

</details><br/>

[Back to top](#contents)

### Final Score View

Final score view displays a message depending on the right score with the username. Also, a Play Again and Player Scores buttons are displayed. Play Again buttons resets the game bring user to the landing view.

<details><summary><b>Final Score View</b></summary>

![Final Score](docs/final-score.png)

</details><br/>

[Back to top](#contents)

### Player Scores

Local storage feature has been introduced to store top 5 the most recent player scores. When the button is clicked, the scores are displayed in the alert. 

<details><summary><b>Player Scores View/b></summary>

![Player Scores View](docs/player-scores-view.png)

</details><br/>

### Footer

To continue with cool toned theme, footer is very simple with two icons at the bottom. They both link to the site owners GitHub and LinkedIn pages and open in the separate tab. Footer icons also have hover effect. 

<details><summary><b>Footer All Screen Sizes</b></summary>

![Footer](docs/footer.png)

![Footer](docs/footer-hover.png)

</details><br/>

[Back to top](#contents)

### 404 Page

In a scenario where the link may be broken, 404 page has a built in 15 second auto refresh function which returns to homepage. 

<details><summary><b>404 Page Screenshot</b></summary>

![404 Page](docs/404-page.png)

</details><br/>

[Back to top](#contents)

### Loader

Loader was also added to remove an empty display of question box while content is being loaded from [Open Trivia DB]("https://opentdb.com/"). In an unlikely scenario, where database website is not active, loader will show and fetch error will appear if the questions fail to retrieve from DB. 

<details><summary><b>Loader</b></summary>

![Loader](docs/loader.png)

</details><br/>

## Future Enhancements


* Multiple player option.
* Online scoreboard that includes all players.
* Share results on Social Media. 
* Option to store the progress and return to the quiz at a later time, allowing to finish it at user's pace and not lose any of the questions already completed.
* Broaden range of animation topics such as principles of animation, software tools, and industry best practices.
* Provide hints or additional resources for challenging questions.
* Time-adjustable quiz where player can select a time limit for each question, all questions or have no limitless time to complete.

[Back to top](#contents)

# Technologies Used

## Languages

- [HTML](https://developer.mozilla.org/en-US/docs/Glossary/HTML5 "HTML")
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS "CSS")
- [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript "JS")

## Libraries & Framework

- [Google Fonts](https://fonts.google.com/ "Google Fonts")
- [Favicon](https://favicon.io/ "Favicon")
- [Open Trivia DB]("https://opentdb.com/" "Open Trivia DB")
- [cdnjs]("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" "cdnjs")

## Tools

* [Codeanywhere](https://app.codeanywhere.com/ "Codeanywhere")
* [GitHub](https://github.com/ "GitHub")
* [GitPod](https://www.gitpod.io/#get-started "GitPod")
* [Balsamiq](https://balsamiq.com/wireframes/ "Balsamiq")
* [W3C HTML Validation Service](https://validator.w3.org/ "W3C HTML")
* [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/ "W3C CSS")
* [JSHint](https://jshint.com/ "JSHint")
* [TOC Generator](https://ecotrust-canada.github.io/markdown-toc/ "TOC Generator")
* [Am I Responsive](https://ui.dev/amiresponsive "Am I responsive")
* [Responsive Design Checker](https://responsivedesignchecker.com/ "Responsive Design Checker")
* [WAVE Accessibility Tool](https://wave.webaim.org/ "WAVE Accessibility Tool")
* [Image Resize](https://www.iloveimg.com/ "iLoveIMG")
* [Color Contrast Accessibility Validator](https://color.a11y.com/ "Color Contrast Accessibility Validator")


[Back to top](#contents)

# Testing

## Bugs Fixed

The game was thoroughly tested. I have documented the manual testing in other parts of this document. I have also, used console logs to unsure JavaScript is running as expected in the background. 3 major bugs were identified and rectified: 

| Bug                              | Status | Description                                                                                                                                                                 | Steps To Resolve                                                                                                                                                         |
| -------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Player Scores array not updating | Fixed  | New player scores not adding to the player score array. The same 5 scores displaying all the time.                                                                          | Wrong method used. Score was being added to the ed of Array which is fixed size. Updated JS code to add score to the beginning of Array and sort the scores accordingly. |
| Infinite Timer                   | Fixed  | While testing using console logs, transpired that timer keeps running after the game is finished and until Play Again is clicked.                                           | Moved startTimer function into get new question so when no questions are displayed the timer will not start.                                                             |
| Progress Dots Missing            | Fixed  | The aim for the functionality is to display correct answers in green, wrong - red, timed out - grey. While testing noticed that it does not add a dot for timed out answer. | Added a function to updateProgressDot ('empty') when the time is up.                                                                                                     |

[Back to top](#contents)

## Responsiveness Tests

To test the responsiveness, I have launched the website very early on. I followed the mobile-first strategy and verified all of my modifications using the DevTools browsers for Google Chrome and Microsoft Edge. Deployed versions were tested using the external website [Responsive Design Checker](https://responsivedesignchecker.com/ "Responsive Design Checker"). The [Am I Responsive](https://ui.dev/amiresponsive "Am I responsive") website was another external source that was used to obtain a unified view of different device breakpoints.

I have also used Google Chrome's Mobile Simulator extension to evaluate the responsiveness of even more specialized devices. Device samples were examined for navigation, element alignment, content layout, and functionality concerns at different breakpoints. I moved the hamburger icon from the left to the right to enhance user experience as a result of the testing.

Final Test Results:

| Size | Device Example     | Navigation | Element Alignments | Content Placement | Functionality | Notes                                             |
| ---- | ------------------ | ---------- | ------------------ | ----------------- | ------------- | ------------------------------------------------- |
| sm   | Samsung Galaxy S20 | Good       | Good               | Good              | Good          | 
| sm   | iPhone 11 PRO      | Good       | Good               | Good              | Good          | Updated font size of the sart area
| sm   | iPhone 13 PRO MAX  | Good       | Good               | Good              | Good          | Updated header bottom margin to fit quiz container 
| md   | iPad MINI          | Good       | Good               | Good              | Good          |                                                   |
| md   | Galaxy Tab S7      | Good       | Good               | Good              | Good          |                                                   |
| md   | iPad Air           | Good       | Good               | Good              | Good          |                                                   |
| lg   | iPad Pro           | Good       | Good               | Good              | Good          |                                                   |
| xl   | Mackbook Air       | Good       | Good               | Good              | Good          |                             
| xl   | HP Stream Laptop   | Good       | Good               | Good              | Good          |
| xxl  | Dell Lattitude     | Good       | Good               | Good              | Good          | Updated font weight for support headings                                        |
| xxl  | Desktop            | Good       | Good               | Good              | Good          |                                                   |

[Back to top](#contents)


## Code Validation

### HTML

I have used [W3C HTML Validation Service](https://validator.w3.org/ "W3C HTML"). I have tested 2 html files. They both came back without errors.

* Main Quiz Page:

![W3C HTML Validator](docs/html-validator-index.png "W3C HTML Validator index.html")

* Feedback Acknowledgement:

![W3C HTML Validator](docs/html-validator-feedback-thanks.png "W3C HTML Validator feedback-thanks.html")

* 404 Page:

![W3C HTML Validator](docs/404-validator-html.png "W3C HTML Validator 404.html")


[Back to top](#contents)

### CSS
CSS code for the webpage was validated on [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/ "W3C CSS Validator"). It has returned errors only relating to external cdnjs file which is used for font awesome icons. There were no errors relating CSS code for this website. 

![W3C CSS Validator](docs/css-validator-results.png "W3C CSS Validator results")

[Back to top](#contents)

### JavaScript


![JS Validation Image](docs/js-test-result.png)

[Back to top](#contents)


## User Story Testing

| User Story                                                                               | Result                                                                   | Pass |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---- |
| As a user, I want my knowledge to be challenged.                                         | Quiz fetches questions from API so they do not repeat frequently         | Yes  |
| As a user, I want to be able to test my knowledge at different levels.                   | User can choose from 3 levels                                            | Yes  |
| As a user, I want to receive immediate feedback on my quiz answers                       | Once answer selected, color changes depending whether its correct or not | Yes  |
| As a user, I want the instructions to be clear, concise and easily accessible.           | Instructions written in plain English and displayed at the of the page   | Yes  |
| As a user, I want navigation to be intuitive.                                            | Buttons named logically                                                  | Yes  |
| As a user, I want the score system to be transparent.                                    | Final score displayed                                                    | Yes  |
| As a user, I want to be able to use website on range of devices.                         | Quiz is fully functional on all devices                                  | Yes  |
| As a user, I want to be able to easily contact content creators for feedback or changes. | Feedback form available                                                  | Yes  |
| As a user, I want the content to be accessible for anyone with diverse needs.            | Passed all accessibility tests                                           | Yes  |

[Back to top](#contents)


## Feature Testing

This website was extensively tested for functionality using both Chrome and Edge developer tools.

Every feature was manually tested using the test script and outcomes recorded. 

[Feature Testing Results](docs/feature-test-results.pdf "Feature Testing Results")


[Back to top](#contents)


## Accessibility Testing

I have used web accessibility evaluation tool [WAVE Tool](https://wave.webaim.org/) which helps to determine if web content is accessible to individuals with diverse needs. No issues were raised.

![WAVE](docs/wave-report.png "WAVE Result")

In addition to WAVE testing, I have tested my webpage for color contrast accessibility on [Color Contrast Accessibility Validator](https://color.a11y.com/).

![Color Contrast Accessibility Validator](docs/a11y-result.png "Color Contrast Accessibility Validator Result")

[Back to top](#contents)


## Lighthouse Testing

The Ultimate Animation Quiz has been tested in the [Chrome Dev Tools](https://developer.chrome.com/docs/devtools/) and [Microsoft Edge Dev Tools](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/open/?tabs=cmd-Windows) using Lighthouse Testing tool which inspects and scores the website for the following criteria:

* Performance - how quickly a website loads and how quickly users can access it.
* Accessibility - test analyses how well people who use assistive technologies can use your website.
* Best Practices - checks whether the page is built on the modern standards of web development.
* SEO - checks if the website is optimised for search engine result rankings.

Tests for Desktop on Lighthouse Chrome:
![Lighthouse-Desktop-Chrome-Index](docs/lighthouse-desktop-chrome-index.png "Lighthouse-Desktop-Chrome-Index")

Tests for Mobile on Lighthouse Chrome:
![Lighthouse-Mobile-Chrome-Index](docs/lighthouse-mobile-chrome-index.png "Lighthouse-Mobile-Chrome-Index")

Tests for Desktop Lighthouse Edge:
![Lighthouse-Desktop-Edge-Index](docs/lighthouse-desktop-edge-index.png "Lighthouse-Desktop-Edge-Index")

Tests for Mobile on Lighthouse Edge:
![Lighthouse-Mobile-Edge-Index](docs/lighthouse-mobile-edge-index.png "Lighthouse-Mobile-Edge-Index")


[Back to top](#contents)


## Browser Testing

The Animation Quiz website was examined for bugs and malfunctions using a variety of browsers. Opera, Firefox, Google Chrome, and Microsoft Edge were selected for thorough testing. Additionally, I have registered with [BrowserStack](https://live.browserstack.com/) in order to test my page on both Safari and Internet Explorer. Due of its age, Internet Explorer's initial results were quite subpar. On an iPad and an iPhone, I tested Safari. For the website's final version, no significant problems were discovered on the top 4 browsers. The test findings were verified. 

[Browser Compatibility Manual Test](docs/browser-compatibility-test-results.pdf "Browser Compatibility Manual Test")


[Back to top](#contents)

# Deployment

## To deploy the project

The Ultimate Animation Quiz was deployed early in the process to GitHub pages via the following steps:

- Navigate to the repository on GitHub and click on **Settings**.

- In the side navigation and select **Pages**.

- In the **None** dropdown and choose **Main**.

- Click on the **Save** button.

- The website is now live at `https://indre-v.github.io/animation-quiz/`.

_Any changes required to the website, they can be made, committed and pushed to GitHub._

[Back to top](#contents)

## To fork the project

Forking the GitHub repository allows you to create a duplicate of a local repository. This is done so that modifications to the copy can be performed without compromising the original repository.

- Log in to GitHub.
- Locate the repository.
- Click to open it.
- The fork button is located on the right side of the repository menu.
- To copy the repository to your GitHub account, click the button.

## To clone the project

- Log in to GitHub.
- Navigate to the main page of the repository and click Code.
- Copy the URL for the repository.
- Open your local IDE.
- Change the current working directory to the location where you want the cloned directory.
- Type git clone, and then paste the URL you copied earlier.
- Press Enter to create your local clone.

[Back to top](#contents)

# Credits

- Feedback, advice and support:

  - [Simen Daehlin](https://github.com/Eventyret "Simen Daehlin")

* Quiz Questions

  * [Open Trivia DB]("https://opentdb.com/" "Open Trivia DB")

- Code inspiration and learning content:

  - [Project Portfolio-2 channel on Slack](https://slack.com/intl/en-ie/ "Slack")
  - [Love Maths Project](https://codeinstitute.net "Love Maths Project")
  - [W3C Schools](https://www.w3schools.com/ "W3C Schools")
  - [StackOverflow](https://stackoverflow.com/ "StackOverflow")
  - [CodePen](https://codepen.io/pen/ "CodePen")

* YouTube Channels for Quiz fetch and API Fetch: 

  * [Keep Coding](https://www.youtube.com/watch?v=MxrGPP4F8Sc "YouTube")
  * [Web Dev Simplified](https://www.youtube.com/watch?v=riDzcEQbX6k "YouTube")
  * [Great Stack](https://www.youtube.com/watch?v=PBcqGxrr9g8 "YouTube")
  * [James Q Quick](https://www.youtube.com/watch?v=u98ROZjBWy8&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx "YouTube")
  * [Ali Aslan](https://www.youtube.com/watch?v=xZXW5SnCiWI&t=2450s "YoutTube")
  * [Code Explained](https://www.youtube.com/watch?v=49pYIMygIcU "YouTube")



* Visual content:

  - [Coolors](https://coolors.co/ "Coolors")
  - [Contrast Grid](https://contrast-grid.eightshapes.com/ "Contrast Grid")

* Images:
  
  - [Gencraft](https://gencraft.com/ "Gencraft")


[Back to top](#contents)











