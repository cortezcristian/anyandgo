
// ### <%=pagename %> Page
app.get('/<%=pagename.toLowerCase() %>', function (req, res) {
    res.render('<%=pagename.toLowerCase() %>', { title: '<%=pagename %>', section: '<%=pagename %>' });
});
