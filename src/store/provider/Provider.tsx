import AuthModalProvider from "./AuthModalProvider";
import AccountProvider from "./AccountProvider";
interface Props {
  children: JSX.Element;
}
const Provider: React.FC<Props> = ({ children }) => {
  return (
    <AccountProvider>
      <AuthModalProvider>{children}</AuthModalProvider>
    </AccountProvider>
  );
};

export default Provider;
