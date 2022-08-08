document.querySelector("footer .plus").addEventListener("click", function () {
  document.querySelector(".popup").classList.add("active");
});
validateForm();
document
  .querySelector(".popup .close-btn")
  .addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
  });
let Books = [];
class Book {
  constructor(Title, Author, Pages, Read) {
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Read = Read;
    this.display = "no";
  }
}
const submit = document.querySelector("#submit");
submit.addEventListener("click", function () {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#hasread").checked;
  const book = new Book(title, author, pages, read);
  Books.push(book);
  document.querySelector(".popup").classList.remove("active");
  form = document.getElementById("myform");
  displayBooks();
  form.reset();
});

function displayBooks() {
  const bookcontainer = document.querySelector(".bookcontainer");
  for (const book of Books) {
    if (book.display === "yes") continue;
    const div = document.createElement("div");
    bookcontainer.appendChild(div);
    div.classList.add("books");
    div.setAttribute("index", Books.indexOf(book));
    for (const [key, value] of Object.entries(book)) {
      if (key == "display") continue;
      const child_div = document.createElement("div");
      div.appendChild(child_div);
      child_div.classList.add("book");
      if (key == "Read") {
        const span = document.createElement("span");
        span.textContent = `Read?`;
        const input = document.createElement("input");
        input.checked = value;
        input.setAttribute("type", "checkbox");
        child_div.append(span);
        child_div.append(input);
        book.display = "yes";
        input.disabled = true;
      } else {
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        span1.textContent = `${key}:`;
        span2.textContent = `${value}`;
        child_div.append(span1);
        child_div.append(span2);
        book.display = "yes";
      }
    }

    //  const icons=document.querySelector('.icons');
    const icons = document.createElement("div");
    const icon1 = document.createElement("icon");
    const icon2 = document.createElement("icon");
    icon1.classList.add("fa-solid");
    icon1.classList.add("fa-pencil");
    icon2.classList.add("fa-solid");
    icon2.classList.add("fa-trash");
    icons.classList.add("icons");
    div.appendChild(icons);
    icons.appendChild(icon1);
    icons.appendChild(icon2);
    const functions = document.querySelectorAll("icon");
    console.log(functions);
    functions.forEach((x) => {
      x.addEventListener("click", deleteOrEdit);
    });
  }
}

function deleteOrEdit(e) {
  console.log(e.target.classList);
  if (e.target.classList.value == "fa-solid fa-trash") {
    const books_div = e.target.parentNode.parentNode;
    const index = books_div.getAttribute("index");
    Books.splice(index, 1);
    books_div.remove();
    const books = document.querySelectorAll(".books");
    books.forEach((book) => {
      if (book.getAttribute("index") > index)
        book.setAttribute("index", book.getAttribute("index") - 1);
    });
  }

  if (e.target.classList.value == "fa-solid fa-pencil") {
    const books_div = e.target.parentNode.parentNode;
    const input_div = books_div.childNodes[3];
    const checkbox = input_div.lastChild;
    checkbox.disabled = false;
    console.log(checkbox);
  }
}

function validateForm() {
  const form = document.querySelector("#myform");
  const book_name = document.querySelector("#title");
  const author_name = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  let book_error = document.querySelector('#title-error');
  let page_error = document.querySelector('#page-error');
  let author_error = document.querySelector('#author-error');
  author_name.addEventListener('input',function(event){
      if (author_name.validity.valid)
      {
          author_error.textContent='';
          author_error.className='error';
      }
      else{
          if (author_name.validity.valueMissing){
              author_error.textContent="Author name cant be empty";
              author_error.className='error active';
          }
      }
  })
  pages.addEventListener('input',function(event)
  {
    if (pages.validity.valid) {
        // In case there is an error message visible, if the field
        // is valid, we remove the error message.
        page_error.textContent = ''; // Reset the content of the message
        page_error.className = 'error'; // Reset the visual state of the message
      } else {
        // If there is still an error, show the correct error
        if (pages.validity.valueMissing)
        {
            page_error.textContent="Pages cant be empty";
            page_error.className='error active';
        }
        else if(pages.validity.rangeUnderflow)
        {
            page_error.textContent="Pages cant be less than one";
            page_error.className='error active';
        }
      }
  })
  book_name.addEventListener('input', function (event) {
    // Each time the user types something, we check if the
    // form fields are valid.
  
    if (book_name.validity.valid) {
      // In case there is an error message visible, if the field
      // is valid, we remove the error message.
      book_error.textContent = ''; // Reset the content of the message
      book_error.className = 'error'; // Reset the visual state of the message
    } else {
      // If there is still an error, show the correct error
      if (book_name.validity.valueMissing)
      {
          book_error.textContent="Book name cant be empty";
          book_error.className='error active';
      }
    }
  });
}
