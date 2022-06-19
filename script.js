document.querySelector('footer .plus').addEventListener('click',function()
{
    document.querySelector('.popup').classList.add('active');
});

document.querySelector('.popup .close-btn').addEventListener('click',function()
{
    document.querySelector('.popup').classList.remove('active');
});
let Books=[];
function Book(Title,Author,Pages,Read)
{
    this.Title=Title;
    this.Author=Author;
    this.Pages=Pages;
    this.Read=Read;
    this.display="no";
}
const submit = document.querySelector('#submit');
submit.addEventListener('click',function()
{
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const pages=document.querySelector('#pages').value;
    const read=document.querySelector('#hasread').value;
    const book= new Book(title,author,pages,read);
    Books.push(book);
    document.querySelector('.popup').classList.remove('active');
    form=document.getElementById('myform');
    displayBooks();
    form.reset();
});

function displayBooks()
{
    const bookcontainer=document.querySelector('.bookcontainer');
    for(const book of Books)
    {
        if(book.display === "yes")
        continue;
        const div = document.createElement('div');
        bookcontainer.appendChild(div);
        div.classList.add('books');
        for (const [key, value] of Object.entries(book)) {
            if(key=="display")
            continue;
             const child_div=document.createElement('div');
             div.appendChild(child_div);
             child_div.classList.add('book')
             if (key == "Read")
            {
                const span=document.createElement('span');
                span.textContent=`Read?`
                const input=document.createElement('input');
                input.setAttribute('type','checkbox');
                input.value=value;
                child_div.append(span);
                child_div.append(input);
                book.display="yes";
            }
            else
            {
             const span1=document.createElement('span');
             const span2=document.createElement('span');
             span1.textContent=`${key}:`;
             span2.textContent=`${value}`;
             child_div.append(span1);
             child_div.append(span2);
             book.display="yes";
            }
            

         }
        //  const icons=document.querySelector('.icons');
         const icons=document.createElement('div');
         const icon1=document.createElement('icon');
         const icon2=document.createElement('icon');
         icon1.classList.add('fa-solid');
         icon1.classList.add('fa-pencil');
         icon2.classList.add('fa-solid');
         icon2.classList.add('fa-trash');
         icons.classList.add('icons');
         div.appendChild(icons);
         icons.appendChild(icon1);
         icons.appendChild(icon2);
    }
}

