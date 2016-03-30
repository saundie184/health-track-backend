'use strict';

function checkIfNullValues(obj){

}

checkIfNullValues(myObj);

var myObj ={
  name: 'Sally',
  date: 'null'
}

// var arr = ["hello", "Tonsils removed", "Pneumonia", "Broken foot", "Lasik eye surgery", "Gluten"];
//
// function stringify(array) {
//   var string = '';
//   for(var i = 0; i < array.length; i++){
//     string += (array[i]+ ', ');
//   }
//   return string;
// }
//
// console.log(stringify(arr));




//
// function family(id, arr) {
//   //take input and turn into obj for creating family Tree
//   // console.log(arr);
//   var newObj = {
//     'name': id,
//     'parents': [
//
//     ]
//   };
//   var immediate = arr[0];
//   var mothers = arr[1];
//   // var fathers = arr[2];
//
//   // for arr[0], loop through and find 'mother, add to parents array'
//   for (var i = 0; i < immediate.length; i++) {
//     if (immediate[i].relationship === 'father') {
//       // console.log(immediate[i]);
//       var fatherObj = {
//         'name': immediate[i].name,
//         'relationship': immediate[i].relationship,
//         "id": immediate[i].id,
//         "parents": []
//       };
//       newObj.parents.push(fatherObj);
//     }
//     if (immediate[i].relationship === 'mother') {
//       var motherObj = {
//         'name': immediate[i].name,
//         'relationship': immediate[i].relationship,
//         "id": immediate[i].id,
//         "parents": []
//       };
//       newObj.parents.push(motherObj);
//     }
//
//
//   }
//   for (var j = 0; j < mothers.length; j++) {
//     if (mothers[j].relationship === 'mothers mother') {
//
//       //where mother's parents array is
//       // var mothersParents = newObj.parents.relationship
//       var parents = newObj.parents;
//       for (var key in parents) {
//         if (parents[key].relationship === 'mother') {
//           // console.log(parents[key]);
//           var mothersMom = {
//             'name': mothers[j].name,
//             'relationship': mothers[j].relationship,
//             "id": mothers[j].id
//           };
//           // console.log(mothersMom);
//           parents[key].parents.push(mothersMom);
//
//         }
//         // console.log(parents);
//       }
//     }
//   }
//   // return newObj.parents[1].parents;
//   return newObj;
// }
//
//
// var rel = [
//   [{
//     "id": 66,
//     "user_id": 56,
//     "name": "Julie",
//     "relationship": "sister",
//     "dob": "1988-06-02T00:00:00.000Z",
//     "dod": "1999-03-22T00:00:00.000Z",
//     "sex": "F",
//     "blood_type": "A+"
//   }, {
//     "id": 54,
//     "user_id": 56,
//     "name": "Steve",
//     "relationship": "father",
//     "dob": "1968-03-01T00:00:00.000Z",
//     "dod": null,
//     "sex": null,
//     "blood_type": null
//   }, {
//     "id": 55,
//     "user_id": 56,
//     "name": "Lisa",
//     "relationship": "mother",
//     "dob": "1970-03-08T00:00:00.000Z",
//     "dod": null,
//     "sex": null,
//     "blood_type": null
//   }],
//   [{
//     "id": 60,
//     "user_id": 56,
//     "name": "MyAunt",
//     "relationship": "mothers sister",
//     "dob": "1956-03-22T00:00:00.000Z",
//     "dod": null,
//     "sex": null,
//     "blood_type": null
//   }, {
//     "id": 62,
//     "user_id": 56,
//     "name": "AuntieTest",
//     "relationship": "mothers sister",
//     "dob": "1966-03-29T00:00:00.000Z",
//     "dod": "0200-03-23T00:00:00.000Z",
//     "sex": null,
//     "blood_type": null
//   }, {
//     "id": 58,
//     "user_id": 56,
//     "name": "Grandma",
//     "relationship": "mothers mother",
//     "dob": "1933-03-08T00:00:00.000Z",
//     "dod": "1990-10-20T00:00:00.000Z",
//     "sex": null,
//     "blood_type": null
//   }],
//   [{
//     "id": 59,
//     "user_id": 56,
//     "name": "Auntie",
//     "relationship": "fathers father",
//     "dob": "1920-03-22T00:00:00.000Z",
//     "dod": "1977-03-22T00:00:00.000Z",
//     "sex": null,
//     "blood_type": null
//   }, {
//     "id": 63,
//     "user_id": 56,
//     "name": "UncleTest",
//     "relationship": "fathers brother",
//     "dob": "1988-03-22T00:00:00.000Z",
//     "dod": null,
//     "sex": "M",
//     "blood_type": null
//   }]
// ];
// // console.log(rel);
// console.log(family(56, rel));
