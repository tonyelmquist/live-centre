import UIKit
import WebKit

@available(iOS 8.0, *)
extension WKWebView: FLWebViewProvider {
    // Use associated objects to set and get the request ivar
    func associatedObjectKey() -> String {
        return "kAssociatedObjectKey"
    }
    
    var request: URLRequest? {
        get {
            return objc_getAssociatedObject(self, associatedObjectKey()) as? URLRequest
        }
        set(newValue) {
            objc_setAssociatedObject(self, associatedObjectKey(), newValue, .OBJC_ASSOCIATION_RETAIN_NONATOMIC)
        }
    }
    
    // A simple convenience initializer, this allows for WKWebView(delegateView:) initialization
    convenience init(delegateView: AnyObject) {
        self.init()
        self.uiDelegate = delegateView as? WKUIDelegate
        self.navigationDelegate = delegateView as? WKNavigationDelegate
    }
    
    // We will need to set both the UIDelegate AND navigationDelegate in the case of WebKit
    func setDelegateViews(viewController: ViewController) {
        self.uiDelegate = viewController as WKUIDelegate
        self.navigationDelegate = viewController as WKNavigationDelegate
    }

    func currentURL() -> URL? {
        return self.url
    }
    
    func canNavigateBackward() -> Bool {
        return self.canGoBack
    }
    
    func canNavigateForward() -> Bool {
        return self.canGoForward
    }
    
    // A quick method for loading requests based on strings in a URL format
    func loadRequestFromString(urlNameAsString: String!) {
        if #available(iOS 9.0, *) {
            let path = Bundle.main.path(forResource: "html", ofType: "", inDirectory: "")
            self.loadFileURL(URL(fileURLWithPath: urlNameAsString), allowingReadAccessTo: URL(fileURLWithPath: path!))
        } else {
            // Fallback on earlier versions
            self.load(URLRequest(url: URL(fileURLWithPath: urlNameAsString)))
        }
    }

    // Pass this up the chain and let WebKit handle it
    func evaluateJS(javascriptString: String!, completionHandler: @escaping (Any?, Error?) -> ()) {
        self.evaluateJavaScript(javascriptString, completionHandler: completionHandler)
    }

    
    
    func setBounces(bounces: Bool) {
        self.scrollView.bounces = bounces
    }

}
