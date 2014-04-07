# Fenix CLI

The Fenix command line interface provides a small utility for managing Fenix servers from the console.

For updated information, please visit the [Fenix Website](http://www.fenixwebserver.com).

[![Support via Gittip](https://rawgithub.com/twolfson/gittip-badge/0.2.0/dist/gittip.png)](https://www.gittip.com/coreybutler/)


## Commands

Fenix is a global application, so it will run from any directory.

### fenix list

Lists all known web servers and their current status.

### fenix start

Create and/or start a new Fenix web server using this command. There are several options to get a server running quickly.

**Option 1: Autodetect Everything**

`fenix start`

This simple command tells Fenix to start a server. If the server doesn't exist, it creates a new server for whichever directory
this command is run from (current working directory). It automatically names the server and selects an open port to run the server on.
The server is auto-started and the configuration of the server (new or existing) is output to the console.

**Option 2: Specify Site Path**

`fenix start /path/to/MySite`

By providing the site root, Fenix will automatically start and/or create a server for `/path/to/MySite`. By default, it uses the
directory as the descriptive name of the server, i.e. `MySite` in this example. It will also assign an available
port. The server is started and the server configuration (new or existing) are output to the console.

**Option 3: Specify Port**

`fenix start 3000`

By providing a port number, Fenix will automatically start and/or create a new server using the current working directory as the root and
port `3000`. For new servers, it will automatically name the site according to the root path. The server is started automatically and the
server configuration (new or existing) is output to the screen.

**Option 4: Specify Name**

`fenix start My Server`

This command only works if an existing server named `My Server` has been created. It will start the server automatically and output the
server configuration to the console.

### fenix stop

This command will stop a running Fenix server. If a server is specified that isn't running, it will still show the server as being stopped.

Servers can be specified a few different ways:

- **By Name:** `fenix stop My Server` will stop the server named `My Server`.
- **By Port:** `fenix stop 3000` will stop the server running on port `3000`.
- **By Root:** `fenix stop /path/to/MySite` will stop the server whose root is `/path/to/MySite`.
- **Autodetect:** `fenix stop` will attempt to stop the server whose root is the current working directory (i.e. where the command is run from).

If a server is shared publicly, this command will automatically unshare it before stopping the server.

### fenix share

This command will share a server publicly. The public URL is output to the console. This command is the same as the **start** command, except it will
share the server after everything is done.

This command is unique since it will actually create and start the server automatically if no server is recognized.

### fenix unshare

This will stop sharing a server publicly. It uses the same syntax as the _stop_ command:

- **By Name:** `fenix unshare My Server` will unshare the server named `My Server`.
- **By Port:** `fenix unshare 3000` will unshare the server running on port `3000`.
- **By Root:** `fenix unshare /path/to/MySite` will unshare the server whose root is `/path/to/MySite`.
- **Autodetect:** `fenix unshare` will attempt to unshare the server whose root is the current working directory (i.e. where the command is run from).

This will not stop the server, so it will still be available via `localhost` or `127.0.0.1`.

### fenix status

Similar to the _list_ command, this command will output the current configuration/status. The only different from _list_ is
it will only display the specified server.

- **By Name:** `fenix status My Server` will display the status of the server named `My Server`.
- **By Port:** `fenix status 3000` will display the status of the server running on port `3000`.
- **By Root:** `fenix status /path/to/MySite` will display the status of the server whose root is `/path/to/MySite`.
- **Autodetect:** `fenix status` will attempt to display the status of the server whose root is the current working directory (i.e. where the command is run from).

### fenix browse

This command will open the specified server in a new browser window, using the computer's default browser.

- **By Name:** `fenix browse My Server` will open the server named `My Server`.
- **By Port:** `fenix browse 3000` will open the server running on port `3000`.
- **By Root:** `fenix browse /path/to/MySite` will open the server whose root is `/path/to/MySite`.
- **Autodetect:** `fenix browse` will attempt to open the server whose root is the current working directory (i.e. where the command is run from).

### fenix remove

This command will remove the specified server. If the server is shared/running, it will be unshared/stopped prioer to removal.

- **By Name:** `fenix remove My Server` will remove the server named `My Server`.
- **By Port:** `fenix remove 3000` will remove the server running on port `3000`.
- **By Root:** `fenix remove /path/to/MySite` will remove the server whose root is `/path/to/MySite`.
- **Autodetect:** `fenix remove` will attempt to remove the server whose root is the current working directory (i.e. where the command is run from).

### fenix close

This command will close the desktop application.

### fenix help

This command provides a list of the commands Fenix supports.

### fenix version

Displays the version of Fenix that is currently running.
