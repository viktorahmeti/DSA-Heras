import Foundation

protocol Stackable {
    associatedtype Element
    func peek() -> Element?
    mutating func push(_ element: Element)
    @discardableResult mutating func pop() -> Element?
}

extension Stackable {
    var isEmpty: Bool { peek() == nil }
}
