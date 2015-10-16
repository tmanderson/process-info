# Process Info

Crawling [Triviaware](http://triviaware.com/macprocess/all) website.

## TODO
- [ ] Use a CLI framework (flags for names, errors, descriptions, etc...)
- [ ] Further utilities for processes that aren't found or to manage hogs

### CSS SELECTORS:
- `.process` general container
- `.process_description h3` name of process
- `.process_description p`
    - 1st line: process location
    - 2nd: description (if applicable)
- `.process_description p a`: link to google search
