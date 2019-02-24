import {LoadingModal} from '../../widget/components/LoadingModal/LoadingModal';
window.LoadingModal = LoadingModal;
// $.ajax({
//     url: '/assets/tmp/app-list.json',
//     method: 'GET',
//     async:false,
//     success: function (rep) {
//         window.can.applist = rep
//         $.ajax({
//             url: '/metadata/app/getMenu',
//             method: 'POST',
//             async:false,
//             contentType: "application/json",
//             data: JSON.stringify(rep),
//             dataType: "json",
//             success: function (rep) {
//                 // console.log(rep)
//                 window.can.menus = rep.menus[4].children;
//                 can.menus[0].link = rep.menus[4].children[0].link.replace('businessData', "ClientInfo");
//                 can.menus[1].link = rep.menus[4].children[1].link.replace('businessData', "ClientInfo");
                
//             }
//         });
//     }
// });

// axios.get('/assets/tmp/app-list.json')
// .then(function (response) {
//     window.can.applist = response.data
//     axios.post('/metadata/app/getMenu',can.applist)
//     .then(function (response) {
//         console.log(response)
//         window.can.menus = response.data.menus;
//     })
// })
