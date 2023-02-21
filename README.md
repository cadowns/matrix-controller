# matrix-controller
This is a niche Node.JS/Express web app that exists to add a REST API to an OREI USB 3.0 matrix switch.

This code accepts JSON as an HTTP POST at the `/update` endpoint and redirects components of the body to a telnet command for the matrix switch.

Example:

JSON Request:
```
{
"client":1,
"host":1
}
```
will send a telnet command formatted like `>SetUSB 01:01` to the matrix switch.

This code only supports 1-way control, currently there is no feedback from the matrix switch.