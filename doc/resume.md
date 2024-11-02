- got upload-resume working
- got job description updating
- error when calling generate-cv

ContextContainer.tsx:43 
 POST http://localhost:3000/api/generate-cv 500 (Internal Server Error)
dispatchXhrRequest	@	xhr.js:195
xhr	@	xhr.js:15
dispatchRequest	@	dispatchRequest.js:51
_request	@	Axios.js:173
request	@	Axios.js:40
httpMethod	@	Axios.js:212
wrap	@	bind.js:5
handleSendMessage	@	ContextContainer.tsx:43
callCallback	@	react-dom.development.js:4164
invokeGuardedCallbackDev	@	react-dom.development.js:4213
invokeGuardedCallback	@	react-dom.development.js:4277
invokeGuardedCallbackAndCatchFirstError	@	react-dom.development.js:4291
executeDispatch	@	react-dom.development.js:9041
processDispatchQueueItemsInOrder	@	react-dom.development.js:9073
processDispatchQueue	@	react-dom.development.js:9086
dispatchEventsForPlugins	@	react-dom.development.js:9097
(anonymous)	@	react-dom.development.js:9288
batchedUpdates$1	@	react-dom.development.js:26179
batchedUpdates	@	react-dom.development.js:3991
dispatchEventForPluginEventSystem	@	react-dom.development.js:9287
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay	@	react-dom.development.js:6465
dispatchEvent	@	react-dom.development.js:6457
dispatchDiscreteEvent	@	react-dom.development.js:6430
Show less
ContextContainer.tsx:52 Error generating cover letter: 
AxiosError {message: 'Request failed with status code 500', name: 'AxiosError', code: 'ERR_BAD_RESPONSE', config: {…}, request: XMLHttpRequest, …}
code
: 
"ERR_BAD_RESPONSE"
config
: 
{transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
message
: 
"Request failed with status code 500"
name
: 
"AxiosError"
request
: 
XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
response
: 
{data: {…}, status: 500, statusText: 'Internal Server Error', headers: AxiosHeaders, config: {…}, …}
status
: 
500
stack
: 
"AxiosError: Request failed with status code 500\n    at settle (http://localhost:3000/static/js/bundle.js:43904:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/static/js/bundle.js:42555:66)\n    at Axios.request (http://localhost:3000/static/js/bundle.js:43054:41)\n    at async handleSendMessage (http://localhost:3000/static/js/bundle.js:278:24)"
[[Prototype]]
: 
Error
constructor
: 
ƒ AxiosError(message, code, config, request, response)
toJSON
: 
ƒ toJSON()
isAxiosError
: 
true
[[Prototype]]
: 
Object