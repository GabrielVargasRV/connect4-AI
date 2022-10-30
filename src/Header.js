const headerElement = document.getElementById('header');

class Header{
    static changeToRed(){
        headerElement.classList.remove('header-yellow');
        headerElement.classList.add('header-red');
        headerElement.innerHTML = 'TURN OF RED';
    }

    static changeToYellow(){
        headerElement.classList.remove('header-red');
        headerElement.classList.add('header-yellow');
        headerElement.innerHTML = 'TURN OF YELLOW'
    }
}

export default Header;