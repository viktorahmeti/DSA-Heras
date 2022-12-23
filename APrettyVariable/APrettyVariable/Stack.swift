//
//  Stack.swift
//  VariableExample
//
//  Created by Frakton on 1.12.22.
//

import Foundation

struct Stack<Element>: Stackable where Element: Equatable {
    private var storage = [Element]()
    func peek() -> Element? { storage.last }
    mutating func push(_ element: Element) { storage.append(element)  }
    mutating func pop() -> Element? { storage.popLast() }
}

extension Stack: Equatable {
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool { lhs.storage == rhs.storage }
}

extension Stack: CustomStringConvertible {
    var description: String { "\(storage)" }
}
    
extension Stack: ExpressibleByArrayLiteral {
    init(arrayLiteral elements: Self.Element...) { storage = elements }
}
