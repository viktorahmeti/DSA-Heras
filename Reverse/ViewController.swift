//
//  ViewController.swift
//  test
//
//  Created by Frakton on 17.12.22.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var label: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        let name:String = "Politika"
        label.text = name
    }


    @IBAction func reverse(_ sender: Any) {
        
        let oldName:String = label.text!
        
        var stack:Stack<Character> = Stack<Character>()
        
        for char in oldName{
            stack.push(char)
        }
        
        var newName:String = ""
        
        while !stack.isEmpty{
            newName.append(stack.pop()!)
        }
        
        label.text = newName
    }
}

