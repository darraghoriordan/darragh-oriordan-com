---
title: Debugging specific mouse clicks in JavaScript
category: 'development'
cover: header.jpg
date: '2019-11-30T17:12:33'
---

I recently needed to trigger the chrome debugger on a mouse click from an element that gets popped up based on a previous mouse click. The problem was that the code is old jQuery code that manually set handlers and it was all a bit spaghetti. I didn't know where the click was registered to a handler or which parts of the code ran afterwards so adding a `debugger;` call wasn't a great approach this time.

<!-- end excerpt -->

tl;dr: disable all breakpoints and just use the `ctrl-F8` keyboard shortcut to enable all breakpoints right before you perform the mouse action.

## Breakpoint Method

It can be hard to setup a mouse interaction break point to trigger just before you need it. The act of simply moving the mouse across elements can trigger stuff or you might need to click on something to open a popup and then you want to debug a subsequent click on an element in the popup.

Say I wanted to get the debugger to stop on a specific mouse click.

First enable the specific event breakpoint.

![Event Listener Breakpoints](./debugger-console.jpg 'Event Listener Breakpoints')

Next disable ALL breakpoints using `ctrl-F8`

Navigate to get to the part of the page or interaction just before the one you want to break on.

Just before triggering the event with a click, hit `ctrl-F8` again to enable the breakpoints and now do your click event!
