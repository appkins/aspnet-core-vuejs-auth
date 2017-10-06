import App from './App.vue';
import AuthLayout from './layouts/Auth.vue';
import DefaultLayout from './layouts/Default.vue';
import SignIn from './pages/SignIn.vue';
import Register from './pages/Register.vue';
import Contacts from './pages/Contacts.vue';
import ContactForm from './components/ContactForm.vue';

export const routes = [
    {
        path: '', component: AuthLayout,
        children: [
            { path: '/', component: SignIn },
            { path: '/register', component: Register },
        ]
    },
    {
        path: '', component: DefaultLayout,
        children: [
            { path: '/contacts', component: Contacts },
            { path: '/contacts/new', component: ContactForm },
            { path: '/contacts/edit/:id', name: 'editContact', component: ContactForm }
        ]
    },
];

