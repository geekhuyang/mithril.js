var o = require("../../ospec/ospec")
var m = require("../../render/hyperscript")

o.spec("hyperscript", function() {
	o.spec("selector", function() {
		o("handles tag in selector", function() {
			var vnode = m("a")
			
			o(vnode.tag).equals("a")
		})
		o("handles class in selector", function() {
			var vnode = m(".a")
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.className).equals("a")
		})
		o("handles many classes in selector", function() {
			var vnode = m(".a.b.c")
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.className).equals("a b c")
		})
		o("handles id in selector", function() {
			var vnode = m("#a")
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.id).equals("a")
		})
		o("handles attr in selector", function() {
			var vnode = m("[a=b]")
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals("b")
		})
		o("handles many attrs in selector", function() {
			var vnode = m("[a=b][c=d]")
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals("b")
			o(vnode.attrs.c).equals("d")
		})
		o("handles attr w/ spaces in selector", function() {
			var vnode = m("[a = b]")
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals("b")
		})
		o("handles attr w/ quotes in selector", function() {
			var vnode = m("[a='b']")
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals("b")
		})
		o("handles attr w/ quotes and spaces in selector", function() {
			var vnode = m("[a = 'b']")
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals("b")
		})
		o("handles many attr w/ quotes and spaces in selector", function() {
			var vnode = m("[a = 'b'][c = 'd']")
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals("b")
			o(vnode.attrs.c).equals("d")
		})
		o("handles tag, class, attrs in selector", function() {
			var vnode = m("a.b[c = 'd']")
			
			o(vnode.tag).equals("a")
			o(vnode.attrs.className).equals("b")
			o(vnode.attrs.c).equals("d")
		})
		o("handles tag, mixed classes, attrs in selector", function() {
			var vnode = m("a.b[c = 'd'].e[f = 'g']")
			
			o(vnode.tag).equals("a")
			o(vnode.attrs.className).equals("b e")
			o(vnode.attrs.c).equals("d")
			o(vnode.attrs.f).equals("g")
		})
		o("handles attr without value", function() {
			var vnode = m("[a]")
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals(true)
		})
	})
	o.spec("attrs", function() {
		o("handles string attr", function() {
			var vnode = m("div", {a: "b"})
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals("b")
		})
		o("handles falsy string attr", function() {
			var vnode = m("div", {a: ""})
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals("")
		})
		o("handles number attr", function() {
			var vnode = m("div", {a: 1})
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals(1)
		})
		o("handles falsy number attr", function() {
			var vnode = m("div", {a: 0})
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals(0)
		})
		o("handles boolean attr", function() {
			var vnode = m("div", {a: true})
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals(true)
		})
		o("handles falsy boolean attr", function() {
			var vnode = m("div", {a: false})
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals(false)
		})
		o("handles many attrs", function() {
			var vnode = m("div", {a: "b", c: "d"})
			
			o(vnode.tag).equals("div")
			o(vnode.attrs.a).equals("b")
			o(vnode.attrs.c).equals("d")
		})
		o("handles merging classes w/ class property", function() {
			var vnode = m(".a", {class: "b"})
			
			o(vnode.attrs.className).equals("a b")
		})
		o("handles merging classes w/ className property", function() {
			var vnode = m(".a", {className: "b"})
			
			o(vnode.attrs.className).equals("a b")
		})
	})
	o.spec("children", function() {
		o("handles string single child", function() {
			var vnode = m("div", {}, ["a"])
			
			o(vnode.text).equals("a")
		})
		o("handles falsy string single child", function() {
			var vnode = m("div", {}, [""])
			
			o(vnode.text).equals("")
		})
		o("handles number single child", function() {
			var vnode = m("div", {}, [1])
			
			o(vnode.text).equals(1)
		})
		o("handles falsy number single child", function() {
			var vnode = m("div", {}, [0])
			
			o(vnode.text).equals(0)
		})
		o("handles boolean single child", function() {
			var vnode = m("div", {}, [true])
			
			o(vnode.text).equals(true)
		})
		o("handles falsy boolean single child", function() {
			var vnode = m("div", {}, [false])
			
			o(vnode.text).equals(false)
		})
		o("handles null single child", function() {
			var vnode = m("div", {}, [null])
			
			o(vnode.children[0]).equals(null)
		})
		o("handles undefined single child", function() {
			var vnode = m("div", {}, [undefined])
			
			o(vnode.children[0]).equals(undefined)
		})
		o("handles multiple string children", function() {
			var vnode = m("div", {}, ["", "a"])
			
			o(vnode.children[0].tag).equals("#")
			o(vnode.children[0].children).equals("")
			o(vnode.children[1].tag).equals("#")
			o(vnode.children[1].children).equals("a")
		})
		o("handles multiple number children", function() {
			var vnode = m("div", {}, [0, 1])
			
			o(vnode.children[0].tag).equals("#")
			o(vnode.children[0].children).equals(0)
			o(vnode.children[1].tag).equals("#")
			o(vnode.children[1].children).equals(1)
		})
		o("handles multiple boolean children", function() {
			var vnode = m("div", {}, [false, true])
			
			o(vnode.children[0].tag).equals("#")
			o(vnode.children[0].children).equals(false)
			o(vnode.children[1].tag).equals("#")
			o(vnode.children[1].children).equals(true)
		})
		o("handles multiple null/undefined child", function() {
			var vnode = m("div", {}, [null, undefined])
			
			o(vnode.children[0]).equals(null)
			o(vnode.children[1]).equals(undefined)
		})
	})
	o.spec("permutations", function() {
		o("handles null attr and children", function() {
			var vnode = m("div", null, [m("a"), m("b")])
			
			o(vnode.children.length).equals(2)
			o(vnode.children[0].tag).equals("a")
			o(vnode.children[1].tag).equals("b")
		})
		o("handles null attr and child unwrapped", function() {
			var vnode = m("div", null, m("a"))
			
			o(vnode.children.length).equals(1)
			o(vnode.children[0].tag).equals("a")
		})
		o("handles null attr and children unwrapped", function() {
			var vnode = m("div", null, m("a"), m("b"))
			
			o(vnode.children.length).equals(2)
			o(vnode.children[0].tag).equals("a")
			o(vnode.children[1].tag).equals("b")
		})
		o("handles attr and children", function() {
			var vnode = m("div", {a: "b"}, [m("i"), m("s")])
			
			o(vnode.attrs.a).equals("b")
			o(vnode.children[0].tag).equals("i")
			o(vnode.children[1].tag).equals("s")
		})
		o("handles attr and child unwrapped", function() {
			var vnode = m("div", {a: "b"}, m("i"))
			
			o(vnode.attrs.a).equals("b")
			o(vnode.children[0].tag).equals("i")
		})
		o("handles attr and children unwrapped", function() {
			var vnode = m("div", {a: "b"}, m("i"), m("s"))
			
			o(vnode.attrs.a).equals("b")
			o(vnode.children[0].tag).equals("i")
			o(vnode.children[1].tag).equals("s")
		})
		o("handles attr and text children", function() {
			var vnode = m("div", {a: "b"}, ["c", "d"])
			
			o(vnode.attrs.a).equals("b")
			o(vnode.children[0].tag).equals("#")
			o(vnode.children[0].children).equals("c")
			o(vnode.children[1].tag).equals("#")
			o(vnode.children[1].children).equals("d")
		})
		o("handles attr and single string text child", function() {
			var vnode = m("div", {a: "b"}, ["c"])
			
			o(vnode.attrs.a).equals("b")
			o(vnode.text).equals("c")
		})
		o("handles attr and single falsy string text child", function() {
			var vnode = m("div", {a: "b"}, [""])
			
			o(vnode.attrs.a).equals("b")
			o(vnode.text).equals("")
		})
		o("handles attr and single number text child", function() {
			var vnode = m("div", {a: "b"}, [1])
			
			o(vnode.attrs.a).equals("b")
			o(vnode.text).equals(1)
		})
		o("handles attr and single falsy number text child", function() {
			var vnode = m("div", {a: "b"}, [0])
			
			o(vnode.attrs.a).equals("b")
			o(vnode.text).equals(0)
		})
		o("handles attr and single boolean text child", function() {
			var vnode = m("div", {a: "b"}, [true])
			
			o(vnode.attrs.a).equals("b")
			o(vnode.text).equals(true)
		})
		o("handles attr and single falsy boolean text child", function() {
			var vnode = m("div", {a: "b"}, [false])
			
			o(vnode.attrs.a).equals("b")
			o(vnode.text).equals(false)
		})
		o("handles attr and single text child unwrapped", function() {
			var vnode = m("div", {a: "b"}, "c")
			
			o(vnode.attrs.a).equals("b")
			o(vnode.text).equals("c")
		})
		o("handles attr and text children unwrapped", function() {
			var vnode = m("div", {a: "b"}, "c", "d")
			
			o(vnode.attrs.a).equals("b")
			o(vnode.children[0].tag).equals("#")
			o(vnode.children[0].children).equals("c")
			o(vnode.children[1].tag).equals("#")
			o(vnode.children[1].children).equals("d")
		})
		o("handles children without attr", function() {
			var vnode = m("div", [m("i"), m("s")])
			
			o(vnode.attrs).equals(undefined)
			o(vnode.children[0].tag).equals("i")
			o(vnode.children[1].tag).equals("s")
		})
		o("handles child without attr unwrapped", function() {
			var vnode = m("div", m("i"))
			
			o(vnode.attrs).equals(undefined)
			o(vnode.children[0].tag).equals("i")
		})
		o("handles children without attr unwrapped", function() {
			var vnode = m("div", m("i"), m("s"))
			
			o(vnode.attrs).equals(undefined)
			o(vnode.children[0].tag).equals("i")
			o(vnode.children[1].tag).equals("s")
		})
		o("handles fragment children without attr unwrapped", function() {
			var vnode = m("div", [m("i")], [m("s")])
			
			o(vnode.children[0].tag).equals("[")
			o(vnode.children[0].children[0].tag).equals("i")
			o(vnode.children[1].tag).equals("[")
			o(vnode.children[1].children[0].tag).equals("s")
		})
		o("handles children with nested array", function() {
			var vnode = m("div", [[m("i"), m("s")]])
			
			o(vnode.children[0].tag).equals("[")
			o(vnode.children[0].children[0].tag).equals("i")
			o(vnode.children[0].children[1].tag).equals("s")
		})
		o("handles children with deeply nested array", function() {
			var vnode = m("div", [[[m("i"), m("s")]]])
			
			o(vnode.children[0].tag).equals("[")
			o(vnode.children[0].children[0].tag).equals("[")
			o(vnode.children[0].children[0].children[0].tag).equals("i")
			o(vnode.children[0].children[0].children[1].tag).equals("s")
		})
	})
	o.spec("namespaced", function() {
		o("handles svg ns", function() {
			var vnode = m("svg", m("g"))
			
			o(vnode.tag).equals("svg")
			o(vnode.ns).equals("http://www.w3.org/2000/svg")
			o(vnode.children[0].tag).equals("g")
			o(vnode.children[0].ns).equals("http://www.w3.org/2000/svg")
		})
		o("handles mathml ns", function() {
			var vnode = m("math", m("mrow"))
			
			o(vnode.tag).equals("math")
			o(vnode.ns).equals("http://www.w3.org/1998/Math/MathML")
			o(vnode.children[0].tag).equals("mrow")
			o(vnode.children[0].ns).equals("http://www.w3.org/1998/Math/MathML")
		})
	})
	o.spec("components", function() {
		o("works", function() {
			var component = {
				view: function() {
					return m("div")
				}
			}
			var vnode = m(component, {id: "a"}, "b")
			
			o(vnode.tag).equals(component)
			o(vnode.attrs.id).equals("a")
			o(vnode.children.length).equals(1)
			o(vnode.children[0].tag).equals("#")
			o(vnode.children[0].children).equals("b")
		})
	})
})