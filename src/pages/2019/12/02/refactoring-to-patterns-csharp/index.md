---
title: Refactoring conditionals to strategies
category: 'development'
cover: header.jpg
date: '2019-12-02T17:12:33'
---

I'm doing some work on a legacy code base and there are some common refactorings I do over and over. One of my favourite improvements is making long lists of conditionals easier to read and especially test.

I use the common refactor-to-strategies pattern from Martin Fowler to deal with these.

<!-- end excerpt -->

## The original code and issues with it

Here is a simplified example of what the code typically looks like. There are heaps of problems with code like this. Especially when it's just a tiny part of an enormous 10,000 line file!

I had a new junior engineer ask how best to tackle something like this. Here is what I told them.

- Hungarian notation is hard to read, the prefix has no value in a strongly typed language, the actual type drifts from the original prefix over time. We should remove the prefixes.
- Using Area and Area2 do not tell us what they are actually used for. Why is 2 different from the original one? We should name these properly if we can.
- There is repetition in the sanitization. We should prevent this.
- It's difficult to test long conditionals. We should make it easier to test.
- It's difficult for a new dev to understand and modify this code. We should always make it easy to modify the code.
- Because the conditionals are different, all of these might run but they all assign to the same variable. It doesn't matter too much here because it's just assignments but we should make it so that only one of these will run as a matter of good practice.

```csharp
pubic partial class MovementMain: Page
{
  // ... a few thousand more lines of code
  if (strArea2.ToLower().Contains(" container"))
  {
    strMovementGroup = strArea2.Replace(" Container", "").Replace(" container", "");
  }
  else if (strArea.ToLower().Contains(" container"))
  {
    strMovementGroup = strArea.Replace(" Container", "").Replace(" container", "");
  }
  else if (intStatus == 3 && "Vehicle".Equals(strTransportType) && intRealQty == 0)
  {
    strMovementGroup = "Vehicle";
  }
  // ... a few thousand more lines of code
}
```

## Refactored code and comments

I created an interface to describe the condition used to select a strategy and the specific strategy to use when selected.

The strategies are added to a list in the desired precedence order.

I then use linq to select the first applicable strategy and use its result.

There is more code here because of the interface and boilerplate around each class. But it's much easier to understand and test (imho anyway!).

If a new developer needs to add a new condition here they just need to add a new condition to the list.

We don't need to test if linq works. We have moved the business logic out of the aspx.cs page. If we did need to test the selector choosing we could move that to factory of some kind.

I also renamed all the variables so they make a little bit more sense.

I don't show it here but the `strMovementGroup` value is later used in further conditionals. Now that we have a strategy selector we can also put the items that depend on this value in the strategy. The root conditional is the one that selects the `strMovementGroup`.

I added an 'empty' strategy so we don't have to worry about nulls.

```csharp
pubic partial class MovementMain: Page
{
  // ... a few thousand more lines of code
  var movementGroupSelectors = new List<ICondition>()
  {
    new VehicleSelector(intStatus, strTransportType, intRealQty),
    new MovementSelector(strArea),
    new MovementSelector(strArea2),
    new UndefinedSelector()
  };

  var movementGroupSelector = movementGroupSelectors
    .First(selector =>
    selector.IsApplicable());

    strMovementGroup = movementGroupSelector.SanitizedName();
 // ... a few thousand more lines of code
}



  // The following would be in different files
public interface ICondition
{
    bool IsApplicable();
    string SanitizedName();
}

public class MovementSelector : ICondition
{
    private readonly string movementName;
    public MovementSelector(string movementName)
    {
        this.movementName = movementName;
    }
    public bool IsApplicable()
    {
        return movementName.ToLower().Contains(" container");
    }
    public string SanitizedName()
    {
        return movementName.Replace(" Container", "").Replace(" container", "");
    }
}

public class VehicleSelector : ICondition
{
    public static string VEHICLE_NAME = "Vehicle";
    public static int AVAILABLE_STATUS = 3;
    private readonly int activeStatus;
    private readonly string transportType;
    private readonly decimal realQuantity;
    public LaybySelector(int activeStatus, string transportType, decimal realQuantity)
    {
        this.activeStatus = activeStatus;
        this.transportType = transportType;
        this.realQuantity = realQuantity;
    }
    public bool IsApplicable()
    {
        return activeStatus == AVAILABLE_STATUS && transportType.Equals(VEHICLE_NAME) && realQuantity == 0;
    }
    public string SanitizedName()
    {
        return VEHICLE_NAME;
    }
}

public class UndefinedSelector : ICondition
{
    public bool IsApplicable()
    {
        return true;
    }
    public string SanitizedName()
    {
        return string.Empty;
    }
}
```

Now sometimes this much refactoring will be overkill.

This happened to be an area where new conditions are likely. You have to use your own judgement to decide what is worth refactoring or not!
