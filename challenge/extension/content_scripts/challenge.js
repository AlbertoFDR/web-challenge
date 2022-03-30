// Template from Mozilla Tutorial
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension
(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;

    var flag = "bubu{r34l_fl4g_w3ll_d0n3}";

    blacklisted = [
        "console",
        "log",
        "flag"
    ];

    function printFlag(){
        console.log("[*] Calling wrapped");
        object = window.wrappedJSObject["getFlag"]();
        console.log("[*] Wrapped, calling evaluateEquation to get your equation.");
        data = object.calculate();
        console.log("[*] Your equation is: " + String(data));

        // blacklist
        for (element of blacklisted){
            if (data.toLowerCase().includes(element)){
                console.log("[*] This is not a equation.");
                return
            }
        }

        result = eval(data);
        console.log("[*] Result: " + String(result));
    }

    setTimeout(printFlag, 1000);
})();

