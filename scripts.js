(function createEvents() {
  // Get all links on the page
  var a = document.getElementsByTagName("a");

  // remove subdomain of current site's url and setup regex
  var internal = new RegExp(location.host.replace("www.", ""), "i");

  // Loop over all links on the page
  for (var i = 0; i < a.length; i++) {
    var link = a[i]
    
    // Test if already has onlick attribute set
    if (!link.hasAttribute("onclick")) { 
      // Test if link is http and external
      if (/^http/i.test(link.href) && !internal.test(link.href)) {
        // Set event name with host of link without the www
        var event = "outbound_" + link.host.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").replace(/[^a-z0-9]+/gi, "_") + link.pathname.replace(/[^a-z0-9]+/gi, "_");
        link.setAttribute("target", "_blank");
        link.setAttribute("onclick", "sa_event('" + event + "');");
      }
      // Download
      else if (link.className === "download") {
        var event = "download_" + link.pathname.split("/").pop().replace(/[^a-z0-9]+/gi, "_");
        link.setAttribute("target", "_blank");
        link.setAttribute("onclick", "sa_event('" + event + "');");
      }
      // Email
      else if (/^mailto:/i.test(link.href)) {
        var event = "email_" + link.href.split(":").pop().replace(/[^a-z0-9]+/gi, "_");
        link.setAttribute("onclick", "sa_event('" + event + "');");
      } 
    }
  }
})();