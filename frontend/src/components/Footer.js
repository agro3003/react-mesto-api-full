export default function Footer(props) {
  return (
    <footer className={`footer ${props.loggedIn && 'footer_active'} body__content body__content_position_footer`}>
      <p className="footer__copyright">© 2020 Mesto Russia</p>
    </footer>
  );
}