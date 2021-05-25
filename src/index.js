import "./style.css";

// Références
const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

// Tableau des Todo
const todos = [
    /*{
        text: "Je suis une todo",
        done: true,
        editMode: true,
    },
    {
        text: "Je suis une autre todo",
        done: false,
        editMode: false,
    },*/
];

/* -- Features -- */

// Ecouteur d'event pour l'ajout
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value;
    input.value = "";
    ajouterTodo(value);
});

// Affichage des todos
const afficherTodo = () => {
    const todosNode = todos.map((todo, index) => {
        // Affichage en fonction du booleen de l'edit mode
        if (todo.editMode) {
            return creerTodoEditElement(todo, index);
        } else {
            return creerTodoElement(todo, index);
        }
    });
    // reset du test puis affichage
    ul.innerHTML = "";
    ul.append(...todosNode);
};

// Création en élément d'une todo
const creerTodoElement = (todo, index) => {
    const li = document.createElement("li");
    const boutonSuppr = document.createElement("button");
    boutonSuppr.innerHTML = "X";
    boutonSuppr.classList.add("danger");
    const boutonEdit = document.createElement("button");
    boutonEdit.innerHTML = "Editer";
    boutonSuppr.addEventListener("click", (event) => {
        event.stopPropagation();
        supprimerTodo(index);
    });
    boutonEdit.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleEditMode(index);
    });
    li.innerHTML = `
      <span class="todo ${todo.done ? "done" : ""}"></span>
      <p class="${todo.done ? "done" : ""}">${todo.text}</p>
    `;
    li.addEventListener("click", (event) => {
        toggleTodo(index);
    });
    li.addEventListener("dblclick", (event) => {
        toggleEditMode(index);
    });
    li.append(boutonEdit, boutonSuppr);
    return li;
};

// Mise en forme todo en mode edition
const creerTodoEditElement = (todo, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;
    const boutonSave = document.createElement("button");
    boutonSave.innerHTML = "Enregistrer";
    boutonSave.classList.add("success");
    const boutonCancel = document.createElement("button");
    boutonCancel.innerHTML = "Annuler";
    boutonCancel.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleEditMode(index);
    });
    boutonSave.addEventListener("click", (event) => {
        modifierTodo(index, input);
    });
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            modifierTodo(index, input);
        }
        if (event.key === "Escape") {
            toggleEditMode(index);
        }
    });
    li.append(input, boutonSave, boutonCancel);
    return li;
};

// Ajout de todo
const ajouterTodo = (text) => {
    text = text.trim();
    if (text) {
        todos.push({
            text: `${text[0].toUpperCase()}${text.slice(1)}`,
            done: false,
        });
        afficherTodo();
    }
};

// Suppression de la todo en index
const supprimerTodo = (index) => {
    todos.splice(index, 1);
    afficherTodo();
};

// Toggle du statut de la todo
const toggleTodo = (index) => {
    todos[index].done = !todos[index].done;
    afficherTodo();
};

// Toggle du mode edit
const toggleEditMode = (index) => {
    todos[index].editMode = !todos[index].editMode;
    afficherTodo();
};

// Modifier todo
const modifierTodo = (index, input) => {
    const value = input.value;
    todos[index].text = value;
    todos[index].editMode = false;
    afficherTodo();
};

// Premier appel d'affichage
afficherTodo();
