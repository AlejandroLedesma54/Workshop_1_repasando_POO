class User {
    constructor(name, email, password, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role; // 'admin' or 'regular'
    }
}

class RegularUser extends User {
    constructor(name, email, password) {
        super(name, email, password, 'regular');
    }
}

class Admin extends User {
    constructor(name, email, password) {
        super(name, email, password, 'admin');
    }

    static validatePassword(password) {
        return password === 'qwerty'; // Secret password for admins
    }
}
