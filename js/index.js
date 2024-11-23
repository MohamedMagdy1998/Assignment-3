var products = [];
var bookmarkNameInput =document.getElementById('bookmarkName');
var bookmarkURLInput=document.getElementById('bookmarkURL');

if(localStorage.getItem('products')!==null)
    {
        products = JSON.parse(localStorage.getItem('products'))
        displaySites();
    }

function addSite()
{
   var product={

        name:bookmarkNameInput.value,
        url:bookmarkURLInput.value

            };

            if(validateForm(bookmarkNameInput)&&
            validateForm(bookmarkURLInput))
            {
              
                    for(var i =0; i<products.length;i++)
                        {
                            if(bookmarkNameInput.value ==products[i].name)
                            {
                                alert("Please enter another bookmark name because it has stored before .");
                                clearForm();
                                return 0;
                            }
                            
                        }
                
              

                products.push(product);
                localStorage.setItem('products',JSON.stringify(products));
    
                displaySites();
    
                clearForm();
            }

            else
            {
               alert('Please enter name and url'); 
            }

            

}

function displaySites()
{
    var cartona ='';
    for(var i=0;i<products.length;i++)
    {
        cartona+=` <tr class="dataRow" id="RowData">
              <td>${i+1}</td>
              <td>${products[i].name}</td>
              <td>
              <a   href="${products[i].url}"
        target="_blank" class="text-white text-decoration-none">
        <button class="btn text-bg-success px-3">
          <i class="fa-solid fa-eye pe-2"></i>Visit </button></a>
          </td>
              <td onclick="deleteSite(${i})"><button class="btn bg-danger text-white"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>
            `
    }

    document.getElementById('info').innerHTML=cartona;

}

function clearForm()
{
    bookmarkNameInput.value=null;
    bookmarkURLInput.value=null;

    bookmarkNameInput.classList.remove('is-valid') ;
    bookmarkURLInput.classList.remove('is-valid') ;
}

function deleteSite(deletedIndex)
{
    products.splice(deletedIndex,1);
    localStorage.setItem('products',JSON.stringify(products));
    displaySites();

}


function validateForm(element)
{
    var regex =
    {
        bookmarkName :/^[a-zA-Z]{3,}$/,
        bookmarkURL  :/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    };

    if(regex[element.id].test(element.value))
    {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        //  element.nextElementSibling.classList.add('d-none');
        return true;
    }
    else
    {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        //  element.nextElementSibling.classList.remove('d-none');
        return false;
    }



}


