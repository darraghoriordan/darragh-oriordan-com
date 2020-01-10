---
title: How to prioritize too many feature requests
category: 'development'
cover: header.jpg
date: '2019-12-18T17:12:33'
---

There's always more work to do than time available to do it. Effective prioritisation is very important to provide the focus to be successful at work.

In general prioritisation is some product of `effort x cost x time` or `value x complexity` applied to possible tasks. The tasks should be aligned to your strategy.

There are some well known frameworks for prioritisation that I find useful. I'll describe them here and talk about how to choose one with your team.

<!-- end excerpt -->

You might find that one prioritisation framework suits the team but you prefer to use a different one for your own tasks.

## Applying a prioritisation framework

I suggest gathering your team together and applying your specific list of work to each framework and see what works best for you. The agenda would look something like this.

1. Quickly create a list of your current tasks. All team members do this individually. Use post it notes so they can be moved around easily. (5 minutes)
2. Are there any frameworks in use by the team at the moment? Any suggestions for frameworks? (5 minutes)
3. Describe the three frameworks below to the team (15 minutes)
4. Apply the the framework to the items from step 1 above (15 minutes)
5. Choose the framework that makes the most sense for the work the team is doing (5 minutes)

## Quadrants

This is a popular form of prioritisation. It looks at the value and complexity of the piece of work. Create a quadrant break down of value and complexity. Place the various work items in the appropriate quadrant. Only work on the items in 1 and 2 (in that order). You might be able to work on the items in 3 but only after the items in 1 and 2 are completed.

Value vs Complexity

```bash
                   High
                   |
              X    |   2
                   |
  Value ________________________ High
                   |
              3    |   1
                   |
               Complexity
```

High value / Low complexity are your quick wins
High value / high complexity are the strategic features
Low value / low complexity things can be worked on usually if there are other factors pushing it but be cautious
Low value / High complexity work should be avoided

## The Intercom RICE framework

```bash
            Reach x Impact x Confidence
        __________________________________
                    Effort
```

This is a numerical framework from intercom. Numbers are nice because it's not easy to argue with a number. Of course there is still some subjectivity in this method. The way this works can make it difficult to apply for teams that have customer facing and internal work. The reach number will vary significantly in that case.

The _reach_ is the number of customers expected to be affected by the work. So a change to our authentication system could expect to reach 100 customers. A change to a feature used only by large enterprise customers would only reach 10 customers.

The _impact_ is very subjective and should be decided as a group with some external input. Use 3 for "massive", 2 for "high", 1 for "medium", 0.5 for low and 0.25 for minimal. These factors will scale the number appropriately.

The _confidence_ is also subjective but don't overthink it. I use 100% for "high", 70% for "medium" and 50% for "low".

For _effort_ use the timeframe that gives you the closest to whole numbers that matches your work. For my team and I that is person-weeks. For teams constantly working on larger pieces of work that might be person-months. It doesn't matter as long as you use whole numbers and are consistent for the set of items you're prioritising.

See the post from intercom for more on this one: <https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/>

## Strategy matrix mapping

Here we have a list of columns that represent the various things that are important to you right now. This is probably related to your strategy or your mission. They should be written in a binary format. Then for each of your items to prioritise you fill in the columns. The matrix provides a visual representation of what should be prioritised.

e.g.

|           | Speed up database team | Speed up support team | Speed up product team | Improves brand |
| --------- | ---------------------- | --------------------- | --------------------- | -------------- |
| Project A | Y                      | N                     | N                     | Y              |
| Project B | Y                      | N                     | Y                     | Y              |
| Project C | N                      | N                     | N                     | Y              |

In this example I would do B, A, C in that order. Often the matrix has many more columns.

## Binary discussions

This method forces a group decision between just two items and you just keep repeating until all items have been sorted next to each other. It's slower but can be useful in groups with different contexts and aims. It encourages discussion (and hopefully empathy) between the various groups.

1. You randomly take two items to be prioritised and discuss them in a timebox.
2. Have the group vote on which one is higher priority.
3. Line up the items in order where A is highest priority

`-- A -- B --`

Now take another random item from the pool and run the same process with B. Say item C is higher priority than B. Now you have.

`-- A -- C -- B --`

So now you have to run the same process between A and C. If it turns out that the group feels C is higher priority you should put that to the left of A.

`-- C -- A -- B --`

And now you have a sorted list of prioritised items. This takes a long time but the discussions that arise are usually very valuable. You should take notes of the discussions! It's a great method for cross-team prioritisation.

## Conclusion

There are many ways to prioritise work and different methods will work for different teams. However always think about why you NEED to prioritise right now.

The most important thing by far is that the entire organisation has the SAME vision and is following the same overall strategy to get there. Ensure this is in place along with introducing any prioritisation tools.
