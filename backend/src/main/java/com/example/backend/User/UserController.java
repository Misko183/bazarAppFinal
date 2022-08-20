package com.example.backend.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserServiceImpl userService;

    @GetMapping("/user")
    public void getUser() {
    }

    @GetMapping("/users")
    public List<User> getUser1() {
        return (List<User>) userRepository.findAll();
    }

    @GetMapping("/usermessege")
       public boolean returnMesseage(){
        return userService.isMessegeAboutUser();
    }

    //Po logine odošle zadané meno a heslo
    @PostMapping("/role")
    public void getRole(@RequestBody User user) {
         userService.findLoggedUsers(user.getUserName(), user.getPassword());
    }

    @GetMapping("/role")
    public User getRole() {
        return userService.getLoggedUser();
    }

    @PostMapping("/createUser")
    public void createUser(@RequestBody User user){
        userService.addUser(user);
    }

    @PostMapping("/deleteuser")
    public void deleteUser(@RequestBody User user){
        userService.deleteUser(user);
    }

}
