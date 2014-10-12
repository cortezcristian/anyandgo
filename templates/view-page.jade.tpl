extends layout

block content
  .jumbotron
    h1=__("pick any·and·go")
    p Route: /<%=pagename.toLowerCase() %>
    p Page: <%=pagename %>
    p
      a.btn.btn-primary.btn-lg(role='button',href="https://github.com/cortezcristian/anyandgo") Read the Docs
