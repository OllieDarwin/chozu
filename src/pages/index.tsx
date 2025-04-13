import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    userNameSchema,
    createSessionSchema,
    joinSessionSchema,
    type UserNameFormValues,
    type CreateSessionFormValues,
    type JoinSessionFormValues
} from "@/shared/schema";

export default function Home() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form for the user name (shared between create and join)
    const userNameForm = useForm<UserNameFormValues>({
        resolver: zodResolver(userNameSchema),
        mode: "onChange",
        defaultValues: {
            userName: ""
        }
    });

    // Form for creating a session
    const createSessionForm = useForm<CreateSessionFormValues>({
        resolver: zodResolver(createSessionSchema),
        mode: "onChange",
        defaultValues: {
            sessionName: "",
            isPrivate: false,
            maxParticipants: 10,
            sessionType: "standard",
            userName: ""
        }
    });

    // Form for joining a session
    const joinSessionForm = useForm<JoinSessionFormValues>({
        resolver: zodResolver(joinSessionSchema),
        mode: "onChange",
        defaultValues: {
            joinCode: "",
            userName: ""
        }
    });


    // Watch the userName to sync between forms
    const userName = userNameForm.watch("userName");

    // Update the userName in other forms when it changes
    const handleUserNameChange = (value: string) => {
        createSessionForm.setValue("userName", value, {
            shouldValidate: true,
            shouldDirty: true
        });
        joinSessionForm.setValue("userName", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    };


    // Handle create session submission
    const onCreateSessionSubmit = (data: CreateSessionFormValues) => {
        console.log("Creating session with data:", data);
        setIsDialogOpen(false);
        // TODO: Create a session
    };

    // Handle join session submission
    const onJoinSessionSubmit = (data: JoinSessionFormValues) => {
        console.log("Joining session with data:", data);
        // TODO: Join a session
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Chozu</h1>
                    <p className="text-gray-500 dark:text-gray-400">The group decision making app, designed for Yozu</p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    {/* Username form */}
                    <Form {...userNameForm}>
                        <form className="space-y-4">
                            <FormField
                                control={userNameForm.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your name"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleUserNameChange(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>

                    <div className="flex flex-col space-y-4 mt-6">
                        {/* Join a Session*/}
                        <div className="p-5 border-2 border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <h2 className="text-xl font-semibold mb-4">Join a Session</h2>

                            <Form {...joinSessionForm}>
                                <form onSubmit={joinSessionForm.handleSubmit(onJoinSessionSubmit)} className="space-y-4">
                                    <FormField
                                        control={joinSessionForm.control}
                                        name="joinCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Session Code</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter the session code"
                                                        className="text-lg"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        disabled={!userName || userName.length < 2}
                                    >
                                        Join Session
                                    </Button>
                                </form>
                            </Form>
                        </div>

                        {/* Divider */}
                        <div className="relative flex items-center my-4">
                            <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                            <span className="px-3 text-gray-500 text-sm">OR</span>
                            <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                        </div>

                        {/* Create a Session */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="w-full"
                                    variant="outline"
                                    disabled={!userName || userName.length < 2}
                                >
                                    Create a Session
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader className="text-left">
                                    <DialogTitle>Create a Session</DialogTitle>
                                    <DialogDescription>
                                        Configure your session settings
                                    </DialogDescription>
                                </DialogHeader>

                                <Form {...createSessionForm}>
                                    <form onSubmit={createSessionForm.handleSubmit(onCreateSessionSubmit)} className="space-y-4 py-4">
                                        <FormField
                                            control={createSessionForm.control}
                                            name="sessionName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Session Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter session name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={createSessionForm.control}
                                            name="isPrivate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>Private Session</FormLabel>
                                                        <FormDescription>
                                                            Require a code to join
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={createSessionForm.control}
                                            name="maxParticipants"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between">
                                                        <FormLabel>Max Participants</FormLabel>
                                                        <span className="text-sm text-gray-500">{field.value}</span>
                                                    </div>
                                                    <FormControl>
                                                        <Slider
                                                            min={2}
                                                            max={50}
                                                            step={1}
                                                            value={[field.value]}
                                                            onValueChange={(values) => field.onChange(values[0])}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={createSessionForm.control}
                                            name="sessionType"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel>Session Type</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="standard" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Standard
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="timed" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Timed (30 min)
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="persistent" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Persistent (24 hrs)
                                                                </FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex justify-end">
                                            <Button type="submit">Create Session</Button>
                                        </div>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}