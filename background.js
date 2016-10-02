function printBookmarks(id) {
 chrome.bookmarks.getChildren(id, function(children) {
    children.forEach(function(bookmark) {
      console.log(bookmark.title);
      printBookmarks(bookmark.id);
    });
 });
}

chrome.browserAction.onClicked.addListener( function(tab) {
  printBookmarks('0');
});
