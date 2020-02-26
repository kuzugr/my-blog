// declare module 'window' {
//   global {
//     interface Window {
//       imobile_tag_ver: String
//       imobile_pid: String
//       imobile_asid: String
//       imobile_width: Number
//       imobile_height: Number
//       imobile_type: String
//     }
//   }
// }

interface MyWindow extends Window {
  imobile_tag_ver: String
  imobile_pid: String
  imobile_asid: String
  imobile_width: Number
  imobile_height: Number
  imobile_type: String
}
declare var window: MyWindow;
export default window;
