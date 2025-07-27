# EditMode Modes 

We need to be able to configure the editor supplying various conditions. We currently use a `when` clause in the dock order to decide 


```JS
setBar({ order: [a,b,c], when: { editMode: "myMode" } })
```

As such, it is basically part of the condition that needs to evaluate to a `boolean`. A so called `predicate`.


As such we can define predicates or modes somewhere else.


