## Table of contents
* [Structure](#Structure)
* [Route](#Route)
* [Endpoints](#Endpoints)
* [Table](#Table)
* [Lang](#Lang)
* [Menu](#Menu)
* [Toast](#Toast)

# Structure
Each module has its own ```route```, ```endpoints```, ```menu sections``` and ```table actions```
rather than grouping into one file.

Each module must have ```facade.js``` contains the files that you should register in the ```Base Module``` by ```Bundle Module```

In this project, We are use [Bootstrap-Vue Icons](https://bootstrap-vue.org/docs/icons) plugin.

```javascript
// module/facade.js

export default {
    Routes,
    Components,
    EndPoints,
    ArLang,
    EnLang,
    Menu
}
```
```javascript
//Bundle/bundle.js

export default [
    ...facades
]
```

# Route
You must create new ```route.js``` file in a module, then export it from ```facade.js```
```javascript
export default [
    {
        path: '',
        component: '',
        children: []
    },
]
```
# Endpoints
You must create new ```endpoints.js``` file in a module, then export it from ```facade.js```
```javascript
let base_url = 'api/model'

let endPoints = {
    model :{
        fetch : {
            method: 'get',
            url: `${base_url}`
        },
        find:{
            method: 'get',
            url: `${base_url}/:id`
        },
        update: (event) => {}
    }
}

export default endPoints;
```
### Hints:
- `event`, if you need to use ```this``` vue instance

### Default Endpoints

```sh
defaultEndPoints(root){
            return {
                fetch :{
                    method: 'get',
                    url : `api/${root}`
                },
                find: {
                    method: 'get',
                    url : `api/${root}/:id`
                },
                update: {
                    method: 'post',
                    url : `api/${root}/:id`
                },
                delete: {
                    method: 'delete',
                    url : `api/${root}/:id`
                },
                status: {
                    method: 'post',
                    url :`api/${root}/:id/is_active`
                }
            }
}
```
### Hints:
- If the endpoint found in `defaultEndPoints`, you can skip register this endpoint. By default, if `route` method does not find the endpoint, it will search for it in `defaultEndPoints`.

### Make Request
To make request, you must use ```rquest``` method.

**Example:**
```javascript
console.log(this.route('model.find',{id: 1}))

//result >> {method: get, url: 'api/model/1'}

console.log(this.route('model.find',{id: 1}, {page: 1}))

//result >> {method: get, url: 'api/model/1?page=1'}
```
```javascript
this.request(this.route('model.find',{id: 1})).then((response)=>{})
```
### Hints:

- ```route``` and ```request``` mixin methods.
- ```route``` accept three arguments,

  the first argument receive a string that split it to array of keys ```required```

  the second argument receive object that replace url params with it ```optional```

  the third argument receive object that appends it to url as query params ```optional```

- ```request``` accept two arguments,

  the first argument receive the result of ```route``` method (object contains method and url after processing url) ```required```

  the second argument receive object (request body) ```optional```

- You must set colon (:) before every url param.

# Table
In this project, we use ```VueGoodTable``` plugin, so you can props three objects to component

- `columns` required
- `endpoint` required
- `actions` optional
- `filters` optional

**Example #columns**

```javascript
let columns = [
                  {
                      label: '#',
                      field: 'g-no',
                  },
                  {
                      label: 'id',
                      field: 'id',
                      hidden: true
                  },
                  {
                      label: 'Name',
                      field: 'name',
                  },
                  {
                      label: 'actions',
                      field: 'g-actions'
                  },
              ]
```

### Hints:

- If the ```field``` isn't exists in the response collection, table builder calls ```getColumnComponents``` that's return array of components names, then check if field exists in it or not.
- `g-no` and `g-actions` are global columns.
- You can customize the column by adding name of component to `getColumnComponents` array.

**Example #endpoint**

```javascript
let endpoint = {
    route: 'model.fetch',
    params: {} // optional
}
```

### Hints:

- You can set type of params as method and its argument receive `this` vue instance.

**Example #filters**

```javascript
let filters = [
                  {
                      type: 'FInput',
                      title: 'name',
                      slug: 'f_name',
                      placeholder: 'enter name ..'
                  },
                  {
                      type: 'FSelect',
                      title: 'bank',
                      slug: 'f_bank',
                      options: {
                          default: [
                              {
                                  id: 1,
                                  name: 'Palestine',
                                  disabled: true
                              },
                          ],
                          endPoint: {
                              route: 'banks.fetch',
                              params: {}, //optional
                              query: {name: 'PLC'} //optional
                          },
                      },
                      attributes: {
                          normalizer(node) {
                              return {
                                  id: node.id,
                                  label: node.name
                              }
                          },
                          placeholder: "please select bank .."
                      },
                  },
                  {
                      type: 'FDate',
                      title: 'created_at',
                      slug: 'f_created_at'
                  }
              ];
```

### Hints:

- You just have to set `slug` (key of filter) and process it from backend.
- `default` option is optional, that's allow you to set manual options before or after endpoint response.
- `endpoint` required option.
- We are use `Vue Treeselect`, so you need to `normalize` response.

**Example #actions**

```javascript
let actions = [
{
        component: 'b-reference-actions',
        references: [
            {
                slug: 'edit',
                refs: (self) => {}
            },
            {
                slug: 'delete',
                refs: () => {
                    return {
                        callback: (event) => {}
                    }
                }
            },
            {
               slug: 'info'
            }
        ]
    },
    {
        component: 'bv-icon',
        attributes: {
            title: 'star',
            icon: "question-circle",
            'font-scale': "1",
            variant: "primary"
        },
        callback: (event) => {
            console.log(event)
        }
    },
    {
        component: 'bs-dropdown',
        icon:{
            attributes:{}
        },
        items:[
            {
                title: 'activate',
                icon:{
                    attributes:{}
                },
                callback: (event) => {}
            },
            {
                title: 'deactivate',
                icon:{
                    attributes:{}
                },
                callback: (event) => {}
            }
        ]
    },
    {
        component: 'bv-dropdown',
        title: 'more',
        icon:{
            attributes:{}
        },
        items:[
            {
                title: 'one',
                attributes:{},
                icon:{
                    attributes:{}
                },
                callback: (event) => {}
            }
        ]
    }
]
```
### Hints:

- `bv-icon`, `bs-dropdown`, `bv-dropdown` and `b-reference-actions` are global component.
- You can customize the action by adding name of component to `getActionComponents` array.
- `callback` to do action after click icon or dropdown item.
- `b-reference-actions` component for global action like edit, delete and redirect, just set `slug` property.
- `callback` in `references` property to do action after perform first callback in global action.

**Example: #How to use**

```javascript
// table.js

const config = {
    columns,
    filters,
    actions,
    endpoint
}

export default config
```
```sh
// list.vue

<template>
    <container :header="header">
        <g-table :config="config"></g-table>
    </container>
</template>

<script>
    import config from "./partials/table";
    export default {
        data(){
            return{
                config: config,
                header: ''
            }
        },
    }
</script>
```

# Lang
You must create new `ar.js` and `en.js` files in a module, then export it from ```facade.js```.

We are use `Vue I18n` plugin for localization.

# Menu
You must create new `menu.js` file in a module, then export it from ```facade.js```.

**Example:**

```javascript
export default [
    {
        component: 'v-menu-item',
        title: 'example',
        icon: 'person-lines-fill',
        route: 'example.show'
    },
    {
        component: 'v-menu-section',
        title: 'General'
    },
    {
        component: 'v-sub-menu-item',
        title: 'model',
        items: [
            {
                component: 'v-menu-item',
                title: 'list',
                route: 'model.list'
            },
            {
                component: 'v-menu-item',
                title: 'create',
                route: 'model.create'
            },
        ]
    },
]
```
# Toast

In this project, we are use two type of alerts

- [Bootstrap-Vue Toast](https://bootstrap-vue.org/docs/components/toast)
- [Sweetalert2](https://sweetalert2.github.io/)

You can use `popDefaultToast` mixin method use bootstrap-vue toast or `popSwalToast` method use swal to alert message.

- `popDefaultToast` method receive two argument, text message and variant color(`default info`)

- `popSwalToast` method receive two argument, icon(`default success`) and text message.

You can use `popSwalConfirm` method to show confirm dialog.

- `popSwalConfirm` method use swal plugin.
- `popSwalConfirm` method receive two argument, title and confirmation text
