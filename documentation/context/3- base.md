## base context

bases are functions created by distros, you can use these functions within your routes,
and to configure something from your base use 'params' and put the base parameters, for example:

````
{
    "base":"tomato:responsejson.base", // base of tomato distro
    "method":"get",
    "base_config":{
        "messageToSend":"hello", // base param
        "statusCodeToSend":200 
    }
}
````

to select a base for your route to use, just follow this rule:
````
<distroname>:<basename>.base
````
[create a project](../how_start/1%20-%20installing_engine.md)
