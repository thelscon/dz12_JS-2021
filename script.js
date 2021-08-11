'use strict' ;

class TodoItem {

    constructor ( id , description , done ) {
        this.id = id ;
        this.description = description ;
        this.done = done ;
    }

}

class TodoList {

    #_id = 0 ;
    items = [] ;
    #_done = false ;

    constructor () {

        const wrapNewItem = document.createElement ( 'div' ) ;
        wrapNewItem.id = 'wrapNewItem' ;
        wrapNewItem.style = `
            display : grid ;
            grid-template-columns : 1fr 1fr ;
            align-items : center ;
            justify-items : center ;
            width : 1024px ;
        ` ;
        application.append ( wrapNewItem ) ;

    }

    add ( description ) {
        this.items.push( new TodoItem ( ++this.#_id , description, this.#_done ) ) ;
        this.#_renderNewTodoItem () ;
    }

    // отрисовка всех TodoIten. По умолчанию не используется. Предположительно сильно нагружает систему при очень большом количестве TodoItem
    #_renderAll () {

        document.getElementById ( 'wrapNewItem' ).remove () ;
        const wrapNewItem = document.createElement ( 'div' ) ;
        wrapNewItem.id = 'wrapNewItem' ;
        wrapNewItem.style = `
            display : grid ;
            grid-template-columns : 1fr 1fr ;
            align-items : center ;
            justify-items : center ;
            width : 1024px ;
        ` ;
        application.append ( wrapNewItem ) ;

        for ( let key = this.items.length - 1 ; key >= 0 ; --key ) { 

            const itemValue = document.createElement ( 'div' ) ;
            itemValue.style = `
                font-size : 20px ;
                line-height : 27px ;
                font-family : 'Noto Sans Light' ;
                width : 674px ;
                margin-top : 31px ;
                margin-bottom : 32px ;
                margin-left : 100px ;
                word-wrap: break-word;
                word-break : break-all ;
            ` ;
            itemValue.id = 'item' + this.items [ key ].id ;
            itemValue.innerText = this.items [ key ].description ;
            wrapNewItem.append ( itemValue ) ;

            const itemCheck = document.createElement ( 'input' ) ;
            itemCheck.type = 'checkbox' ;
            itemCheck.id = 'checkbox' + this.items [ key ].id ;
            if ( this.items [ key ].done === true ) {
                itemCheck.checked = true ;
                itemValue.classList.add ( 'textDecoration__line-through' ) ;
            }
            wrapNewItem.append ( itemCheck ) ;

            if ( this.items [ key ].id > 1 ) {
                const line = document.createElement ( 'div' ) ;
                line.style = `
                    grid-column-start : 1 ;
                    grid-column-end : 3 ;
                    width : 924px ;
                    height : 1px ;
                    background-color : black ;
                ` ;
                wrapNewItem.append ( line ) ;
            }

        }    
            
    }

    // отрисовка каждого нового TodoIten. Используется по умолчанию
    #_renderNewTodoItem ( id, description, done ) {
        
        if ( this.items [ this.items.length - 1  ].id > 1 ) {
            const line = document.createElement ( 'div' ) ;
            line.style = `
                grid-column-start : 1 ;
                grid-column-end : 3 ;

                width : 924px ;
                height : 1px ;
                background-color : black ;
            ` ;
            wrapNewItem.prepend ( line ) ;
        } 

        const itemCheck = document.createElement ( 'input' ) ;
        itemCheck.type = 'checkbox' ;
        itemCheck.id = 'checkbox' + this.items [ this.items.length - 1  ].id ;
        if ( this.items [ this.items.length - 1  ].done === true ) {
            itemCheck.checked = true ;
            itemValue.classList.add ( 'textDecoration__line-through' ) ;
        }
        wrapNewItem.prepend ( itemCheck ) ;

        const itemValue = document.createElement ( 'div' ) ;
        itemValue.style = `
                font-size : 20px ;
                line-height : 27px ;
                font-family : 'Noto Sans Light' ;
                width : 674px ;
                margin-top : 31px ;
                margin-bottom : 32px ;
                margin-left : 100px ;
                word-wrap: break-word;
                word-break : break-all ;
            ` ;
        itemValue.id = 'item' + this.items [ this.items.length - 1 ].id ;
        itemValue.innerText = this.items [ this.items.length - 1  ].description ;
        wrapNewItem.prepend ( itemValue ) ;        

    }

}

const application = document.createElement ( 'div' ) ;
application.style = `
    display : grid ;
    justify-content : center ;
    align-content : center ;
    justify-items : center ;
    align-items : center ;

    margin-top : 50px ;

    background-color : #FBFBFB ;
    border-radius : 25px ;
` ;
document.body.prepend ( application ) ;
application.addEventListener ( 'click' , event => eventApplication() ) ;
function eventApplication () {
    if ( event.target.matches ( 'input' ) && event.target.type === 'checkbox' ) {
        const currentId = event.target.id.slice ( 8 ) ;
        const currentIndex = todoListObject.items.findIndex ( item => String ( item.id ) === currentId ) ;
        if ( event.target.checked )  {            
            document.getElementById ( 'item' + currentId ).classList.add ( 'textDecoration__line-through' ) ;
            todoListObject.items [ currentIndex ].done = true ;
        }
        else {
            document.getElementById ( 'item' + currentId ).classList.remove ( 'textDecoration__line-through' ) ;
            todoListObject.items [ currentIndex ].done = false ;
        }
    }
}

const todoListObject = new TodoList () ;

const heading = document.createElement ( 'div' ) ;
heading.style = `
    display : grid ;
    grid-template-columns : auto auto ;
    grid-template-rows : auto ;
    grid-gap : 25px ;
    justify-content : center ;
    align-content : center ;
    justify-items : center ;
    align-items : center ;

    width : 1024px ;
    padding : 25px 0 ;

    background-color : #EFEFEF ;
    border-radius : 25px ;
` ;
application.prepend ( heading ) ;

const inputText = document.createElement ( 'input' ) ;
inputText.type = 'text' ;
inputText.style = `
    width : 774px ;
    padding : 7px 25px ;
    border-radius : 25px ;
    font-size : 25px ;
    line-height : 34px ;
    font-family : 'Noto Sans Light' ;
    background-color : white ;
    outline : none ;
` ;
inputText.classList.add ( 'inputText' ) ;
heading.append ( inputText ) ;
inputText.addEventListener ( 'keydown' , event => eventInputText ()  ) ;
function eventInputText () {
    if ( event.code === 'Enter' && inputText.value.trim () ) {
        todoListObject.add( inputText.value ) ;
        inputText.value = '' ;   
    }
}

const buttonAdd = document.createElement ( 'button' ) ;
buttonAdd.style = `
    background-color : white ;
    border-radius : 25px ;
    font-size : 25px ;
    line-height : 34px ;
    font-family : 'Noto Sans Extra Light' ;
    outline : none ;

    width : 177px ;
    padding : 8px 25px ;
    word-wrap: break-word;
    word-break : break-all ;
` ;
buttonAdd.textContent = 'ДОБАВИТЬ' ;
buttonAdd.classList.add ( 'buttonAdd' ) ;
heading.append ( buttonAdd ) ;
buttonAdd.addEventListener ( 'click' , event => eventButtonAdd () ) ;
function eventButtonAdd () {
    if ( inputText.value.trim () ) {
        todoListObject.add( inputText.value ) ;
        inputText.value = '' ;     
    }
}