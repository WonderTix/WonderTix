# Omicron Theta

Omicron-Theta is the home planet of Data, an android in Star Trek.

"Unlikely as it may sound, I believe the Enterprise may be forming an intelligence."

This repository contains the requisite `sql` script and mock-data used to initialize
the WonderTix database.


# Installing and Running `psql`

Once you've cloned the repository, setting up the WonderTix database is relatively straightforward.


## Linux

### For Debian based distributions

- Use `apt` to install postgres:
```
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib
```

### For CentOs/Redhat based distributions

- Use `dnf` to install postgres:
```
$ sudo dnf update
$ sudo dnf install postgresql postgresql-server postgresql-contrib
```
- Initialize postgresql server database
```
$ sudo postgresql-setup --initdb --unit postgresql
```
- Enable postgresql server on boot and start it manually:
```
$ sudo systemctl enable postgresql
$ sudo systemctl start postgresql
```

### For all Linux distros

- Start a `psql` shell:
```
$ sudo -u postgres psql
psql (13.4)
Type "help" for help.
postgres=#
```
- If you are having errors about permissions in your current directory, you may want to add the postgres user your group:
```
$ sudo usermod -a -G $(id -gn) postgres
```

## MacOS

(assumes you are running MacOSX 10.7 or higher)

- Make sure you have the `homebrew` package manager installed:
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- Use homebrew to install postgres:
```
$ brew install postgres
```

- Start postgres and make sure it starts up alongside your computer:
```
$ pg_ctl -D /usr/local/var/postgres start && brew services start postgresql
```

- Start a `psql` shell:
```
$ psql postgres
psql (14.2)
Type "help" for help.
postgres=#
```

## Windows

[![psql setup on Windows](https://i.imgur.com/HHqkzR3.png)](https://www.youtube.com/watch?v=hqrrPYGA360& "Setting up WonderTixDB on Windows")

# Initializing the Database

- Run `wtix_db.sql` from within a `psql` shell:
```
\i ./wtix_db.sql;
```

Assuming the script ran successfully; List all the tables that were loaded:
```
\dt public.*;
```

## Testing out `wondertixdb`

Unit-testing is included in `test.js`.

- Install `node-postgres`:
```
npm install pg
```

- Run testing suite:
```
PGDATABASE=wondertixdb node test.js
```

#### References
[`psql` on Linux][Linux]  
[`psql` on MacOS][MacOS]  
[`node-postgres`][npmPG]

[Linux]:https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04
[MacOS]:https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb
[npmPG]:https://node-postgres.com/features/connecting
