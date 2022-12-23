//
//  Stackable.swift
//  test
//
//  Created by Frakton on 17.12.22.
//

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
