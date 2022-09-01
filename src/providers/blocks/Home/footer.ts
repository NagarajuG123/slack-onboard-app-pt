// import { Blocks, Elements } from 'slack-block-builder';
// import { Action } from 'src/enums/Actions.enum';

// export function footer(usersCount, page) {
//   const blocks = [];
//   let limitPerPage = 3;
//   const iterations = usersCount / limitPerPage;
//   if (usersCount > limitPerPage && page === 1) {
//     blocks.push(
//       Blocks.Actions().elements(
//         Elements.Button({
//           text: 'Next :arrow_forward:',
//           actionId: Action.NextButton,
//           value: String(page),
//         }).primary(),
//       ),
//     );
//   } else if (usersCount > limitPerPage && page === Math.ceil(iterations)) {
//     blocks.push(
//       Blocks.Actions().elements(
//         Elements.Button({
//           text: ':arrow_backward: Prev',
//           actionId: Action.PreviousButton,
//           value: String(page),
//         }).primary(),
//       ),
//     );
//   } else if (usersCount > limitPerPage && page <= Math.ceil(iterations)) {
//     blocks.push(
//       Blocks.Actions().elements(
//         Elements.Button({
//           text: 'Next :arrow_forward:',
//           actionId: Action.NextButton,
//           value: String(page),
//         }).primary(),
//         Elements.Button({
//           text: ':arrow_backward: Prev',
//           actionId: Action.PreviousButton,
//           value: String(page),
//         }).primary(),
//       ),
//     );
//   }

//   return blocks;
// }
