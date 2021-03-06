# React Native / Web Responsive Layout

When developing a project that considers both React Native and React Web as first-class 
experiences, it's helpful to have tools that react different sizes of windows, both on load and 
when resized.

This package aims to replicate tools that the [Material UI](https://mui.com) library has provided, while working 
for both React Native and React Web.

These components have been replicated here:

[Container](https://mui.com/material-ui/react-container/#main-content); a wrapper that centers 
your content horizontally. It's the most basic layout element.

[Grid](https://mui.com/material-ui/react-grid/#main-content); a responsive layout grid that adapts 
to screen size and orientation, ensuring consistency across layouts.

[Stack](https://mui.com/material-ui/react-stack/#main-content); though not explicitly for 
responsive layout, Stack is a simple way to manage the layout of immediate children along the 
vertical or horizontal axis with optional spacing and/or dividers between each child.

[Expo Snack app](https://snack.expo.dev/@sklinks/0dd6c7)

### Room for improvement

* Breakpoints are hard-coded within this package. These should be exposed for configuration.
* `spacing` accepts a multi-breakpoint configuration on MUI, where we're only accepting a single value 