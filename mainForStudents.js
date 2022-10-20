const students = [
    {
        id: 1,
        name: "Bob",
        age: 22,
        isMarried: true,
        scores: 85
    },
    {
        id: 2,
        name: "Alex",
        age: 21,
        isMarried: true,
        scores: 90,
    },
    {
        id: 3,
        name: "Nick",
        age: 20,
        isMarried: false,
        scores: 120
    },
    {
        id: 4,
        name: "John",
        age: 19,
        isMarried: false,
        scores: 100
    },
    {
        id: 5,
        name: "Helen",
        age: 20,
        isMarried: false,
        scores: 110
    },
    {
        id: 6,
        name: "Ann",
        age: 20,
        isMarried: false,
        scores: 105
    },
];

const user = {
    name: "Bob",
    age: 23,
    friends: ["Alex", "Nick", "John"]
}

const superUser = {
    name: "Bob",
    age: 23,
    friends: [
        {
            id: 1,
            name: "Bob",
            age: 22,
            isMarried: true,
            scores: 85
        },
        {
            id: 2,
            name: "Alex",
            age: 21,
            isMarried: true,
            scores: 90,
        },
        {
            id: 4,
            name: "John",
            age: 19,
            isMarried: false,
            scores: 100
        }
    ]
}



//1. Создайте поверхностную копию объекта user
let copyUser = {...user};
console.log(user===copyUser)
console.log(user.friends===copyUser.friends)
//Проверка:
console.log(user===copyUser)// что должно быть в консоли? - false
console.log(user.friends===copyUser.friends)// что должно быть в консоли? - true

//2. Полная (глубокая) копия объекта user
/*let deepCopyUser = JSON.parse(JSON.stringify(user));*/
let deepCopyUser = {...user, friends: [...user.friends]}



//Проверка:
console.log(user===deepCopyUser) // что должно быть в консоли? - false
console.log(user.friends===deepCopyUser.friends) // что должно быть в консоли? - false

//3. Поверхностная копия массива students
let copyStudents;
copyStudents = [...students]
//Проверка:
console.log(students === copyStudents) // что должно быть в консоли? - false
console.log(students[0] === copyStudents [0]) // что должно быть в консоли? - true
console.log(students[0].age === copyStudents[0].age) // что должно быть в консоли? - true
console.log(students.length === copyStudents.length) //- что должно быть в консоли? - true

//4*. Полная (глубокая) копия массива students (map)
let deepCopyStudents;
deepCopyStudents = students.map(el => ({...el}));


//Проверка:
console.log(students === deepCopyStudents) // что должно быть в консоли? - false
console.log(students[0] === deepCopyStudents[0]) // что должно быть в консоли? - false
console.log(students[0].age === deepCopyStudents[0].age) // что должно быть в консоли? - true
console.log(students.length === deepCopyStudents.length) // что должно быть в консоли? - true

// NB!!! Далее все преобразования выполняем не модифицируя исходный массив
// Вывод результатов - в консоль

//5. Отсортируйте копию массива deepCopyStudents по алфавиту (sort)
let sortedByName = [...deepCopyStudents].sort((a, b) => a.name.localeCompare(b.name));
console.log(sortedByName);

//5a. Отсортируйте deepCopyStudents по успеваемости(лучший идёт первым)(sort)
let sortedByScores = deepCopyStudents.sort((a, b) => b.scores - a.scores);
console.log(sortedByScores);

//6. Сформируйте массив студентов, у которых 100 и более баллов (filter)
let  bestStudents = students.filter(el => el.scores >= 100);
console.log(bestStudents)

//6a. Получите массив ("вырежьте") из трёх лучших студентов из массива deepCopyStudents (splice)
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

let topStudents = deepCopyStudents.slice(0, 3);
console.log(topStudents)
console.log(deepCopyStudents)

//6b. Объедините массивы deepCopyStudents и topStudents так,
//чтоб сохранился порядок сортировки (spread-оператор || concat)
let newDeepCopyStudents = {...topStudents, ...deepCopyStudents} ;
console.log(newDeepCopyStudents)


//7. Сформируйте массив холостых студентов (filter)
let notMarriedStudents = students.filter(el => !el.isMarried );
console.log(notMarriedStudents)

//8. Сформируйте массив имён студентов (map)
let studentsNames = students.map(el => el.name);
console.log(studentsNames)

//8a. Сформируйте строку из имён студентов, разделённых
// - пробелом (join)
// - запятой (join)
let namesWithSpace = studentsNames.join(" ");
console.log(namesWithSpace)
let namesWithComma = studentsNames.join(", ");
console.log(namesWithComma)

//9. Добавьте всем студентам свойство "isStudent" со значением true (map)
let trueStudents = students.map(el => ({...el, isStudent: true}));
console.log(trueStudents)

//10. Nick женился. Выполните соответствующие преобразование массива students (map)
let studentsWithMarriedNick = students.map(el => el.name === "Nick" ? {...el, isMarried: true} : el);
console.log(studentsWithMarriedNick)

//11. Найдите студента по имени Ann (find)
let ann = students.find(el => el.name === "Ann");
console.log(ann)

// И поднимаем руку!!!!

//12. Найдите студента с самым высоким баллом (reduce)
// - c помощью reduce
// - *не испльзуя методы массивов и Math.max()*
let bestStudent = students.reduce((a, b) => a.scores > b.scores ? a : b);

console.log(bestStudent)

//13. Найдите сумму баллов всех студентов (reduce)
let scoresSum = students.reduce  ((a, b) => {return a + b.scores;}, 0);
console.log(scoresSum)



// 14. Д.З.:
// Напишите функцию addFriends, которая принимает параметром массив students
// и добавляет в каждому студенту свойство "friends",
// значением которого является массив имён всех остальных студентов из массива students,
// за исключением собственного имени студента. Т.е. в друзьях у Боба Боба быть не должно.
const addFriends = (students) => {
    return students.map(el => ({...el, friends: students.map(st => st.name).filter(i => i.name!== el.name).join(", ")}))
};
console.log(addFriends(students));
// 15. Напишите функцию getBestStudents, которая принимает параметром массив
// students  и количество лучших студентов, которое надо получить в
// новом массиве.
// getBestStudents(students) => [{name: "Nick", age: 20, isMarried: false, scores: 120}]
// getBestStudents(students, 3)
// getBestStudents(students, 10)

const getBestStudents = (students, count = 1) => {
let rez = [...students].sort((a, b) => b.scores - a.scores).splice(0, count)
    return count > students.length
        ? [...rez, ...new Array(count - students.length).fill(null)]
        : rez

/*if (count > students.length) {
    const nullArray = new Array(count - students.length).fill(null)
    // for (let i = 0; i < n; i++){s
    //     rez.push(null)
    // }
    return [...rez, ...nullArray]
}
return rez;*/
}

const getBestStudents2 = (students, num = 1) =>
    new Array(num).fill(null).map((s, i) => i < students.length ? [...students].sort((a, b) => b.scores - a.scores)[i] : s);

console.log(getBestStudents(students, 3))
console.log(getBestStudents(students, 10))

console.log(getBestStudents2(students, 3))
console.log(getBestStudents2(students, 10))







