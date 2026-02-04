## distros context

distros are like plugins, you can add to your API development, and in them the bases are made available that are the same as a controller, but then this controller receives parameters to change its logic and make its route more flexible.

to install a distro in your tx setup, first go to the ./usrl/distros folder, and then clone the repository
from some distro. example:

````
cd ./usrl/distros
git clone https://github.com/Nicolas-Asafe/postgrex
````

important tip! Distros are initialized one by one, that is, if any distro depends on another distro, you can
change the sequence of distros that will be initialized by placing some letter of the alphabet at the beginning of the folder and also
inside ./usrl/distros/<suadistro>/app.distro.ts change __distro_name to the same name as the folder. example:

````
before: usrl/distros/postgrex
after: usrl/distros/zpostgrex // starts last
````
[learn about bases](./3-%20base.md)