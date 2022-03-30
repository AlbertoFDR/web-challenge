# Addon-Context-Challenge
I created this challenge after researching a bit how the isolation between Addon and the Page context works. The browser isolates these two worlds in order to mitigate possible exploits or data access attempt by a malicious page against addons/extensions or their information (user data). However, the browsers could have methods in which you can break this isolation. The Firefox documentation ([link](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts)) says the following one:

> As the content scripts guide notes, content scripts don't see changes made to the DOM by scripts loaded by web pages. This means that, for example, if a web page loads a library like jQuery, content scripts won't be able to use it, and have to load their own copy. Conversely, scripts loaded by web pages can't see changes made by content scripts. 

In some cases, addon developers may need to break this isolation. In that case, Firefox has a special API calls to:

> access JavaScript objects created by page scripts 
> or
> expose their own JavaScript objects to page scripts.

## Challenge
I created an addon that works as a calculator. This addon is going to take the data returned by the user and is going to print the result. In order to provide the data, the user needs to create a function called "getFlag" that returns and object with the function "calculate" which returns the expressions to evaluate. The important code of the content-script inside the addon is the following one:

```
var flag = "XXXXX";

// Some blacklisted words
blacklisted = [
    "console",
    "log",
    "flag"
];

function printFlag(){
    object = window.wrappedJSObject["getFlag"]();
    calculate = object.calculate();

    // blacklist
    for (element of blacklisted){
        if (calculate.toLowerCase().includes(element)){
            console.log("[*] This is not a equation.");
            return
        }
    }

    result = eval(equation);
    console.log("[*] Result: " + String(result));
}

// Execute the method 
setTimeout(printFlag, 1000);
```

Usage example:
```
[*] Your equation is: ((1+2+3+4)/(5*6)) + ((5*20)%9) 
[*] Result: 1.3333333333333333
```

## Addon setup
To set up the addon for the challenge, you need to use the Firefox browser. On the url bar, you need to go to 'about:debugging#/runtime/this-firefox' and add the addon as 'Temporary Addon'. Don't forget to remove it from the browser after getting the flag. 

## Some useful references
- Anatomy of an extension ([link](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)).


