import FirstLine from './FirstLine/FirstLine';
import SecondLine from './SecondLine/SecondLine';
import SeletedLine from './SelectedLine/SelectedLine'
import SelectedQuarter from './SelectedQuarter/SelectedQuarter'

const Header = () => {
  return (
    <div style={{marginLeft:30}}>
      <FirstLine/>
      <SecondLine/>
      <SeletedLine/>
      <SelectedQuarter/>
    </div>
  );
};

export default Header;

