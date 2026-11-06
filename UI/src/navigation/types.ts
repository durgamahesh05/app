export type AuthStackParamList = {
  Login: undefined; Register: undefined; ForgotPassword: undefined;
  VerifyOTP: { email: string; reset?: boolean }; ResetPassword: { email: string; otp: string };
};
export type RootStackParamList = {
  Main: undefined; Auth: undefined; ScanCode: undefined;
  CreateGroup: undefined; JoinGroup: undefined; GroupDetails: { id: string };
  ExpenseDetails: { id: string }; SplitExpense: undefined;
  ReceiptDetails: { uri: string }; ScanReceipt: undefined;
  EditProfile: undefined; Settings: undefined; Language: undefined; Insights: undefined;
};
