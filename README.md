# Marvel Comic Finder
Marvel Comic Finder is a simple web search engine for Marvel comics.
## Installing
Please be sure the complete Part_2 folder is downloaded.
Then open index.html to run the application.
## Running the tests
Enter comic title or initial letters and select a start year, then click search button to view the results. Advanced searching with comic format choosing and sorting functions is also available.
## Design Process
### Analysing Requirements
According the assignment1, there are 3 main functions required for this web applicaiton.
- Allowing user to query results by entering comic's title or initial letters, entering a start year, selecting issue format and choosing how to order the return results.
- Results should be displayed by pages. And there are maximum 10 results every page.
- Each result should include the name, description, thumbnail of the first character in that comic

### Wireframe
I drew a wireframe of the page on the paper to easure that all the functions are included in the application. And the webpage can be divided in to Searching Bar and Result Box these two sections.

#### Searching Bar
##### Input Fields
I decided to only show title input and start date input in the search bar. And these two fields are required for user to start searching.

The format choosing and sorting functions are hiden in the Advanced button. User will have to toggle this button to use advanced searching. These fields are optional for searching.

The reasons is that I want to make sure the page meets minimalist design and also the flexibility of use. Users don't have to enter every field to get the results, they can choose to use short cut or use more functions. I also put a year picker for the start year input field, so that input can be controlled to 4 digit number to prevent error. 

##### Warning Message
When the title or start year input field is blank, there will be warning messages appear upon the search button to remind user to fill the input field. These messages are added to help users recognize and recover from mistakes.

##### Result Message
A message will appear beneath the search button when the processing in the back-end is finished. It will tell user how many results are found or there is no result found. This message provides visibility of searching status to user.

##### Reset
A reset button is put on the left of searching button. User can go back to the initial settings of searching bar by clicking this button. This conventional design might help user to feel more free to use the searching bar.

#### Result Box
##### Result Cards
I put each result into a card with thumbnail on the top and character name, character description and comic title beneath. For results without thumbnails, I used a Marvel Comics logo photo in the card and tell user "no character found" for this comic. So the webpage will be more consistent.

##### Pagination
Pagination will show at the bottom of the page when there are more than 10 results. Users could go to any page by clicking on this pagination.

### Interface Style
I put a Marvel comic photo as the background of searching bar. And I also used dark red for website name and navy blue for other fonts and input boxes to match the theme color of Marvel comics.

## More to know
When there is a large number of returned results, user may have to wait for a while to see the results. This is mainly because I set the async to false in Ajax request. So the results won't show until all the requests have finished. I did this because I can't bring the variable to the outside of the Ajax request if the variable is still waiting to be assigned, and I haven't found better solutions for this problem.

## Built with
- Bootstrap
- Font Awesome
 
## Author
Chen Chen - cc4391