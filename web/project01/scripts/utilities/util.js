async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return response;
}


// Modified from https://www.jimmycuadra.com/posts/keeping-track-of-javascript-event-handlers/
function addUniqueTrackedListener(element, type, handler) {
  if (!element.trackedEvents) {
    element.trackedEvents = {};
  }

  if (!element.trackedEvents[type]) {
    element.trackedEvents[type] = [];

    element[type] = function () {
      element.trackedEvents[type]();
    };
  }

  element.trackedEvents[type] = handler;
};